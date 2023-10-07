<script lang="ts">
  import { uploadProgress, uploading } from "$lib/stores/api/select";
  import { uploadFiles } from "$lib/stores/files/upload";
  import { BarLoader } from "svelte-loading-spinners";

  export let mediaType: "image" | "video" | "both";
  export let multiple = false;
  export let ref: HTMLInputElement;
  export let photos: Record<string, string> = {};
  export let onNewPhotos: (photos: Record<string, string>) => unknown = () => {};

  const typeToAccept: Record<typeof mediaType, string> = {
    both: "image/*,video/*",
    image: "image/*",
    video: "video/*",
  };

  const onChange = async (e: Event) => {
    const files = (e.currentTarget as HTMLInputElement).files;
    if (!files?.length) return;

    photos = await uploadFiles(files);
    onNewPhotos(photos);
  };
</script>

<input
  class="visually-hidden"
  type="file"
  accept={typeToAccept[mediaType]}
  {...multiple && { multiple }}
  bind:this={ref}
  on:change={onChange}
/>

{#if $uploading}
  <div class="my-8 flex flex-col items-center justify-center gap-2">
    <div class="text-regular">Uploading ({$uploadProgress}%)</div>
    <div class="text-primary">
      <BarLoader size="70" color="currentColor" />
    </div>
  </div>
{/if}
