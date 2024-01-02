import { SERVER_URL } from "../../../constants";
import { blobToWebp } from "$utils/files";
import axios from "axios";
import { fail } from "$utils/toasts";
import { throwError } from "$utils/error";
import { writable } from "svelte/store";

export const uploading = writable(false);
export const uploadProgress = writable<number | null>(null);

export const uploadFiles = async (files: Blob[], allowAny = false) => {
  if (!allowAny && [...files].some((file) => !file.type.includes("image"))) {
    fail({ title: "Invalid file", msg: "Invalid file type" });
    throwError("Invalid filetype");
  }

  uploadProgress.set(null);
  uploading.set(true);

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

  uploading.set(false);
  return data;
};

export const uploadFileFromURL = async (url: string) => {
  const res = await fetch(url);
  const blob = await res.blob();
  return await uploadFiles([blob]);
};
