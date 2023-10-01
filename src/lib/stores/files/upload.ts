import type { PickedFile } from "@capawesome/capacitor-file-picker";
import { SERVER_URL } from "../../../constants";
import { b64toBlob, blobToWebp } from "$utils/files";

export const uploadFiles = async (files: PickedFile[]) => {
  const formData = new FormData();

  for (const file of files) {
    const fileBlob = b64toBlob(file.data as string, file.mimeType);
    const webpBlob = await blobToWebp(fileBlob);
    formData.append("file", webpBlob);
  }

  const res = await fetch(`${SERVER_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  const ret = await res.json();
  if (files.length === 1) return ret["file"];
  return ret;
};
