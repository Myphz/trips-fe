import { SERVER_URL } from "../../../constants";
import { blobToWebp } from "$utils/files";
import axios from "axios";
import { uploadProgress, uploading } from "../api/select";

export const uploadFiles = async (files: FileList) => {
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
  return data as string[];
};
