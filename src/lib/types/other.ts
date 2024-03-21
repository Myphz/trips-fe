import type { getMetadata } from "$utils/files";

export type Option = {
  label: string;
  value: string;
};

export type Metadata = Awaited<ReturnType<typeof getMetadata>>;

export type FilePickerRef = {
  showPicker: () => Promise<void>;
};
