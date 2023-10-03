<script lang="ts">
  import { Photo } from "svelte-heros";
  import { uploadFiles } from "$lib/stores/files/upload";
  import { PhotoViewer } from "..";
  import { getContext } from "svelte";

  export let mediaType: "image" | "video" | "both";
  export let name: string;
  export let multiple = false;

  const typeToAccept: Record<typeof mediaType, string> = {
    both: "image/*,video/*",
    image: "image/*",
    video: "video/*",
  };

  const ctx = getContext<Record<string, string>>("defaultValues") ?? {};

  let photo = ctx[name] ?? "";
  let inputRef: HTMLInputElement;

  const pickFile = () => {
    inputRef.showPicker();
  };

  const onChange = async (e: Event) => {
    const files = (e.currentTarget as HTMLInputElement).files;
    if (!files?.length) return;

    photo = await uploadFiles(files);
  };
</script>

<input type="hidden" {name} value={photo} />

<input
  class="visually-hidden"
  type="file"
  accept={typeToAccept[mediaType]}
  {...multiple && { multiple }}
  bind:this={inputRef}
  on:change={onChange}
/>

{#if !photo}
  <button
    on:click={pickFile}
    type="button"
    class="flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-primary py-2.5 text-small"
  >
    <div class="text-primary">
      <Photo size="2rem" />
    </div>
    <span>Add photo</span>
  </button>
{:else}
  <PhotoViewer withCross bind:photo />
{/if}
