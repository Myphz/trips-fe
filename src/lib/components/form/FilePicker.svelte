<script lang="ts">
  import { uploadFiles, uploadProgress, isUploading } from "$lib/stores/files/upload";
  import { BarLoader } from "svelte-loading-spinners";

  export let mediaType: "image" | "video" | "both" | "any";
  export let multiple = false;
  export let ref: HTMLInputElement;
  export let photos: Record<string, string> = {};
  export let onNewPhotos: (photos: Record<string, string>) => unknown = () => {};

  const typeToAccept: Record<typeof mediaType, string> = {
    both: "image/*,video/*",
    image: "image/*",
    video: "video/*",
    any: "",
  };

  const onChange = async (e: Event) => {
    const files = (e.currentTarget as HTMLInputElement).files;
    if (!files?.length) return;

    photos = await uploadFiles(Array.from(files), mediaType === "any");
    onNewPhotos(photos);
  };

  const getStateLabel = (progress: number | null) => {
    if (progress === null) return "Compressing images...";
    if (progress === 100) return "Server processing...";
    return `Uploading (${$uploadProgress}%)`;
  };

  $: stateLabel = getStateLabel($uploadProgress);
</script>

<input
  class="visually-hidden"
  type="file"
  accept={typeToAccept[mediaType]}
  {...multiple && { multiple }}
  bind:this={ref}
  on:change={onChange}
/>

{#if $isUploading}
  <div class="my-8 flex flex-col items-center justify-center gap-2">
    <div class="text-regular">{stateLabel}</div>
    <div class="text-primary">
      <BarLoader size="70" color="currentColor" />
    </div>
  </div>
{/if}
