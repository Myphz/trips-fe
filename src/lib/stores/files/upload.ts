import { SERVER_URL } from "../../../constants";
import { blobToWebp } from "$utils/files";
import axios from "axios";
import { uploadProgress, uploading } from "../api/select";
import { fail } from "$utils/toasts";
import { throwError } from "$utils/error";

export const uploadFiles = async (files: FileList) => {
  if ([...files].some((file) => !file.type.includes("image"))) {
    fail({ title: "Invalid file", msg: "Invalid file type" });
    throwError("Invalid filetype");
  }

  uploadProgress.set(0);
  uploading.set(true);

  const formData = new FormData();

  for (const file of files) {
    const webpBlob = await blobToWebp(file);
    formData.append(file.name, webpBlob);
  }

  const { data } = await axios.post(`${SERVER_URL}/upload`, formData, {
    onUploadProgress(progressEvent) {
      const percentCompleted =
        Math.round((progressEvent.loaded * 10000) / (progressEvent.total ?? 1)) / 100;
      uploadProgress.set(percentCompleted);
    },
  });

  uploading.set(false);

  return data as Record<string, string>;
};
