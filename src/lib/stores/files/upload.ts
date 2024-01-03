import { SERVER_URL } from "../../../constants";
import { blobToWebp } from "$utils/files";
import axios from "axios";
import { fail } from "$utils/toasts";
import { throwError } from "$utils/error";
import { get, writable } from "svelte/store";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { splitArrayIntoChunks } from "$utils/objects";

export const isUploading = writable(false);
export const uploadProgress = writable(0);
export const uploadState = writable<"compressing" | "uploading" | "waiting">("compressing");
export const uploadPromise = writable<Promise<unknown>>(new Promise(() => {}));

const CHUNK_SIZE = 10;

export const uploadFileChunk = async ({
  files,
  allowAny = false,
  onProgress,
}: {
  files: Blob[];
  allowAny?: boolean;
  onProgress: (progress: number) => unknown;
}) => {
  uploadState.set("compressing");
  const formData = new FormData();

  for (const file of files) {
    const blob = allowAny ? file : await blobToWebp(file);
    formData.append("name" in file ? (file.name as string) : (+new Date()).toString(), blob);
  }

  let data: Record<string, string> = {};
  uploadState.set("uploading");

  try {
    ({ data } = await axios.post(`${SERVER_URL}/upload`, formData, {
      onUploadProgress(progressEvent) {
        const percentCompleted =
          Math.round((progressEvent.loaded * 10000) / (progressEvent.total ?? 1)) / 100;
        if (percentCompleted === 100) uploadState.set("waiting");

        onProgress(percentCompleted);
      },
    }));
  } catch (err) {
    fail({ msg: "Unexpected error", title: "Upload error" });
  }

  return data;
};

export const uploadFiles = async ({
  files,
  allowAny = false,
}: {
  files: Blob[];
  allowAny?: boolean;
}) => {
  if (!allowAny && [...files].some((file) => !file.type.includes("image"))) {
    fail({ title: "Invalid file", msg: "Invalid file type" });
    throwError("Invalid filetype");
  }

  uploadProgress.set(0);
  isUploading.set(true);

  let data: Awaited<ReturnType<typeof uploadFileChunk>> = {};
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
    data = { ...data, ...chunkData };
    uploaded += chunk.length;
  }

  isUploading.set(false);
  return data;
};

export const uploadFileFromURL = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return await uploadFiles({ files: [blob] });
};

export const finishUpload = async () => {
  const taskId = await BackgroundTask.beforeExit(async () => {
    await get(uploadPromise);
    BackgroundTask.finish({ taskId });
  });
};
