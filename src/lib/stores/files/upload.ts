import { SERVER_URL } from "../../../constants";
import { blobToWebp } from "$utils/files";

export const uploadFiles = async (files: FileList) => {
  const formData = new FormData();

  for (const file of files) {
    const webpBlob = await blobToWebp(file);
    formData.append(file.name, webpBlob);
  }

  const res = await fetch(`${SERVER_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const ret = await res.json();
  return ret as string[];
};
