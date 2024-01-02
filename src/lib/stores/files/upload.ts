import { SERVER_URL } from "../../../constants";
import { blobToWebp } from "$utils/files";
import axios from "axios";
import { fail } from "$utils/toasts";
import { throwError } from "$utils/error";
import { get, writable } from "svelte/store";
import { BackgroundTask } from "@capawesome/capacitor-background-task";

export const isUploading = writable(false);
export const uploadProgress = writable<number | null>(null);
export const uploadPromise = writable<Promise<unknown>>(new Promise(() => {}));

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

  uploadProgress.set(null);
  isUploading.set(true);

  const formData = new FormData();

  for (const file of files) {
    const blob = allowAny ? file : await blobToWebp(file);
    formData.append(file.name, blob);
  }

  let data: Record<string, string> = {};
  uploadProgress.set(0);

  try {
    ({ data } = await axios.post(`${SERVER_URL}/upload`, formData, {
      onUploadProgress(progressEvent) {
        const percentCompleted =
          Math.round((progressEvent.loaded * 10000) / (progressEvent.total ?? 1)) / 100;
        uploadProgress.set(percentCompleted);
      },
    }));
  } catch (err) {
    fail({ msg: "Unexpected error", title: "Upload error" });
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
