import type { getMetadata } from "$utils/files";

export type Option = {
  label: string;
  value: string;
};

export type Metadata = Awaited<ReturnType<typeof getMetadata>>;
