import type { GetRowType, GetRowTypes } from "$lib/types/api";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { MEANS_OF_TRANSPORT, SERVER_URL } from "../../constants";
import { success } from "./toasts";
import { select, type photos } from "$lib/stores/api/select";
import { FileOpener } from "@capacitor-community/file-opener";
import type { UnwrapWritable } from "$lib/types/route";
import ExifReader from "exifreader";
import { metadataDateToISODate } from "./format";
import type { Metadata } from "$lib/types/other";
import { Share } from "@capacitor/share";
import { throwError } from "./error";

const QUALITY = 0.75;
const MAX_DIMENSION = 1500;

// AI-generated ;)
function getResizedDimensions(originalWidth: number, originalHeight: number) {
  let width = originalWidth;
  let height = originalHeight;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const aspectRatio = width / height;

    if (width > height) {
      // Width exceeds the limit, set width to MAX_DIMENSION
      width = MAX_DIMENSION;
      height = Math.round(width / aspectRatio);
    } else {
      // Height exceeds the limit, set height to MAX_DIMENSION
      height = MAX_DIMENSION;
      width = Math.round(height * aspectRatio);
    }
  }

  return { width, height };
}

export async function blobToWebp(arrayBuffer: ArrayBuffer): Promise<Blob> {
  const imageBitmap = await createImageBitmap(new Blob([arrayBuffer]));
  const { width, height } = getResizedDimensions(imageBitmap.width, imageBitmap.height);
  const canvas = new OffscreenCanvas(width, height);
  const context = canvas.getContext("2d")!;
  context.drawImage(imageBitmap, 0, 0, width, height);
  imageBitmap.close();
  return await canvas.convertToBlob({ type: "image/webp", quality: QUALITY });
}

function blobToJpeg(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const src = URL.createObjectURL(blob);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    const image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = (e) => {
      canvas.width = image.width;
      canvas.height = image.height;
      // @ts-ignore
      URL.revokeObjectURL(e.target.src);
      // @ts-ignore
      context.drawImage(e.target, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (data) => {
          resolve(data as Blob);
        },
        "image/jpeg",
        1,
      );
    };
    image.onerror = (e) => reject(e);
  });
}

function blobToBase64(blob: Blob): Promise<string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(blob);
  });
}

export async function getPhotoURL(photo: string) {
  const reqUrl = `${SERVER_URL}/file?id=${photo}`;
  return await (await fetch(reqUrl)).text();
}

const IMAGES_NUMBER = {
  transport: 2,
  lodging: 3,
  trip: 11,
  food: 4,
} as const;

export function getPlaceholderImage(card: GetRowTypes) {
  if (card.type === "transport") return getPlaceholderTransportImage(card);
  const folderName = card.type === "place" ? "trip" : card.type;
  return `/placeholder/${folderName}/${(card.id % IMAGES_NUMBER[folderName]) + 1}.webp`;
}

export function getPlaceholderTransportImage(card: GetRowType<"transport">) {
  const means = MEANS_OF_TRANSPORT.map((opt) => opt.value.toLowerCase());
  const mean = card.mean || means[Math.floor(Math.random() * means.length)];
  return `/placeholder/transport/${mean.toLowerCase()}/${
    (card.id % IMAGES_NUMBER["transport"]) + 1
  }.webp`;
}

export async function shareImage(photo: string) {
  await downloadImage(photo, false);
  const { uri } = await Filesystem.getUri({
    directory: Directory.ExternalStorage,
    path: `Download/tripsphoexa/${photo}.jpeg`,
  });

  await Share.share({
    url: uri,
  });
}

export async function downloadImage(photo: string, withSuccess = true) {
  const path = `Download/tripsphoexa/${photo}.jpeg`;

  if (await fileExists(path))
    return withSuccess && success({ title: "Image saved", msg: "Image saved successfully" });

  const res = await fetch(`${SERVER_URL}/download?id=${photo}`);
  const blob = await res.blob();
  const jpegBlob = await blobToJpeg(blob);
  const jpegData = await blobToBase64(jpegBlob);

  await Filesystem.writeFile({
    path,
    data: jpegData,
    recursive: true,
    directory: Directory.ExternalStorage,
  });

  withSuccess && success({ title: "Image saved", msg: "Image saved successfully" });
}

async function fileExists(path: string) {
  try {
    await Filesystem.stat({ path, directory: Directory.ExternalStorage });
    return true;
  } catch {
    return false;
  }
}

export async function downloadOrViewFile(file: UnwrapWritable<typeof photos>[number]) {
  const path = `Download/tripsphoexa/${file.name}`;
  const { uri } = await Filesystem.getUri({ directory: Directory.ExternalStorage, path });

  if (await fileExists(path))
    return await FileOpener.open({
      filePath: uri,
    });

  const res = await fetch(`${SERVER_URL}/download?id=${file.id}`);
  const data = await blobToBase64(await res.blob());

  await Filesystem.writeFile({
    path,
    data,
    recursive: true,
    directory: Directory.ExternalStorage,
  });

  await FileOpener.open({
    filePath: uri,
  });
}

export const EMPTY_METADATA: Metadata = {
  created_at: "",
  latitude: null,
  longitude: null,
};

export async function getMetadata(file: ArrayBuffer) {
  const tags = ExifReader.load(file);

  const date = (() => {
    const baseDate = tags.DateTime?.description
      ? metadataDateToISODate(tags.DateTime.description)
      : new Date().toISOString();

    const offset = tags.OffsetTime?.description;

    if (!offset || !tags.DateTime?.description) return baseDate;
    // Add timezone to ISO string!
    return `${baseDate.slice(0, -1)}${offset}`;
  })();

  const latitude = tags.GPSLatitude?.description || null;
  const longitude = tags.GPSLongitude?.description || null;

  return { created_at: date, latitude, longitude };
}

export const thumbnailStringToPhoto = async (thumbnail: string) => {
  return (
    (await select({ table: "photos", cond: { id: thumbnail } }))?.[0] ||
    throwError(`Can't find photo for thumbail ${thumbnail}`)
  );
};
