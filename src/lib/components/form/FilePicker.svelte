<script lang="ts">
  import { uploadFiles } from "$lib/stores/files/upload";

  export let mediaType: "image" | "video" | "both";
  export let multiple = false;
  export let ref: HTMLInputElement;
  export let photos: string[] = [];
  export let onNewPhotos: (ids: string[]) => unknown = () => {};

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
