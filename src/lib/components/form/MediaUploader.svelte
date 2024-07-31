<script lang="ts">
  import { PhotoViewer } from "..";
  import { getContext } from "svelte";
  import FilePicker from "./FilePicker.svelte";
  import PexelsModal from "./PexelsModal.svelte";
  import { uploadFileFromURL } from "$lib/stores/files/upload";
  import { writable, type Writable } from "svelte/store";
  import { EMPTY_METADATA, thumbnailStringToPhoto } from "$utils/files";
  import type { Photos } from "$lib/types/api";
  import { createPhotos } from "$lib/stores/api/create";

  export let mediaType: "image" | "video" | "both";
  export let name: string;

  const ctx = getContext<Writable<Record<string, string>>>("defaultValues") ?? writable({});
  let photo = $ctx[name] ?? "";

  let filePickerPhoto: Photos =
    Object.keys(photo)?.length > 0
      ? {
          [photo]: { id: photo, ...EMPTY_METADATA, is_favourite: false },
        }
      : {};

  let ref: HTMLInputElement;
  let pexelsOpen = false;

  const pickFile = () => ref.showPicker();
  const openPexels = () => (pexelsOpen = true);

  const onPexelImageSelect = async (src: string) => {
    filePickerPhoto = await uploadFileFromURL(src);
    await createPhotos(filePickerPhoto, { is_thumbnail: true });
  };

  $: photo = filePickerPhoto[Object.keys(filePickerPhoto)[0]]?.id || "";
</script>

<input type="hidden" {name} value={photo} />
<FilePicker
  bind:ref
  {mediaType}
  bind:photos={filePickerPhoto}
  onNewPhotos={(photos) => createPhotos(photos, { is_thumbnail: true })}
/>

{#if !photo}
  <div class="flex flex-col gap-2">
    <button
      on:click={pickFile}
      type="button"
      class="flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-primary py-2.5 text-small"
    >
      <div class="text-primary">
        <span class="material-symbols-outlined text-[2rem]">add_photo_alternate</span>
      </div>
      <span>Add photo</span>
    </button>

    <div class="flex items-center gap-4">
      <div class="h-px flex-1 bg-primary"></div>
      <div class="text-small">OR</div>
      <div class="h-px flex-1 bg-primary"></div>
    </div>

    <button
      type="button"
      class="flex w-full items-center justify-center gap-2 rounded-lg bg-[#000] py-2 text-white dark:border dark:border-primary dark:text-black"
      on:click={openPexels}
    >
      <img src="/pexels.png" alt="Pexels" class="aspect-square h-6" />
      <span>Search on Pexels</span>
    </button>
  </div>
{:else}
  {@const fullPhoto = { id: photo, ...EMPTY_METADATA, is_favourite: false }}
  <PhotoViewer withCross photo={fullPhoto} onCrossClick={() => (photo = "")} />
{/if}

<PexelsModal bind:open={pexelsOpen} onImageSelect={onPexelImageSelect} />
