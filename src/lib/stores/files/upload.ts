import { SERVER_URL } from "../../../constants";
import { EMPTY_METADATA, blobToWebp, getMetadata } from "$utils/files";
import axios from "axios";
import { fail } from "$utils/toasts";
import { throwError } from "$utils/error";
import { get, writable } from "svelte/store";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { splitArrayIntoChunks } from "$utils/objects";
import type { Metadata } from "$lib/types/other";
import type { Photos } from "$lib/types/api";

export const isUploading = writable(false);
export const uploadProgress = writable(0);
export const uploadState = writable<"compressing" | "uploading" | "waiting">("compressing");
export const uploadPromise = writable<Promise<unknown>>(new Promise(() => {}));

export const currentPhoto = writable<Photos[string]>();

const CHUNK_SIZE = 10;

export const uploadFileChunk = async ({
  files,
  allowAny = false,
  onProgress,
}: {
  files: File[];
  allowAny?: boolean;
  onProgress: (progress: number) => unknown;
}) => {
  uploadState.set("compressing");

  const body: Record<string, Metadata> = {};
  const formData = new FormData();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const name = "name" in file ? (file.name as string) : new Date().toString();

    body[name] = allowAny
      ? { ...EMPTY_METADATA, created_at: new Date().toISOString() }
      : await getMetadata(arrayBuffer);
    const blob = allowAny ? file : await blobToWebp(arrayBuffer);

    formData.append(name, blob);
  }

  let ret: Record<string, { id: string } & Metadata> = {};
  uploadState.set("uploading");

  try {
    const { data } = await axios.post(`${SERVER_URL}/upload`, formData, {
      onUploadProgress(progressEvent) {
        const percentCompleted =
          Math.round((progressEvent.loaded * 10000) / (progressEvent.total ?? 1)) / 100;
        if (percentCompleted === 100) uploadState.set("waiting");

        onProgress(percentCompleted);
      },
    });

    ret = Object.fromEntries(
      Object.entries(data).map(([filename, id]) => {
        const metadata = body[filename];
        return [filename, { id: id as string, ...metadata }];
      }),
    );
  } catch (err) {
    fail({ msg: "Unexpected error", title: "Upload error" });
  }

  return ret;
};

export const uploadFiles = async ({
  files,
  allowAny = false,
}: {
  files: File[];
  allowAny?: boolean;
}) => {
  if (!allowAny && files.some((file) => !file.type.includes("image"))) {
    fail({ title: "Invalid file", msg: "Invalid file type" });
    throwError("Invalid filetype");
  }

  uploadProgress.set(0);
  isUploading.set(true);

  let ret: Awaited<ReturnType<typeof uploadFileChunk>> = {};
  const chunks = splitArrayIntoChunks(files, CHUNK_SIZE);
  let uploaded = 0;

  for (const chunk of chunks) {
    const previousChunkImportance = uploaded / files.length;
    const chunkData = await uploadFileChunk({
      files: chunk,
      allowAny,
      onProgress: (progress) => {
        // Weigh the progress according to chunk size
        const chunkImportance = chunk.length / files.length;
        const totalProgress = previousChunkImportance * 100 + progress * chunkImportance;
        uploadProgress.set(+totalProgress.toFixed(2));
      },
    });
    ret = { ...ret, ...chunkData };
    uploaded += chunk.length;
  }

  isUploading.set(false);
  return ret;
};

export const uploadFileFromURL = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return await uploadFiles({
    files: [new File([blob], "pexelImage", { type: "image/jpeg" })],
  });
};

export const finishUpload = async () => {
  const taskId = await BackgroundTask.beforeExit(async () => {
    await get(uploadPromise);
    BackgroundTask.finish({ taskId });
  });
};
