<script lang="ts">
  import { PhotoViewer } from "..";
  import { getContext } from "svelte";
  import FilePicker from "./FilePicker.svelte";
  import PexelsModal from "./PexelsModal.svelte";
  import { uploadFileFromURL } from "$lib/stores/files/upload";
  import { writable, type Writable } from "svelte/store";
  import type { Photos } from "$lib/types/api";
  import { EMPTY_METADATA } from "$utils/files";

  export let mediaType: "image" | "video" | "both";
  export let name: string;
  export let multiple = false;

  const ctx = getContext<Writable<Record<string, Photos>>>("defaultValues") ?? writable({});
  let photos = $ctx[name] ?? {};
  if (typeof photos === "string") photos = { unknown: { id: photos, ...EMPTY_METADATA } };

  $: photo = photos[Object.keys(photos)?.[0]]?.id ?? "";

  let ref: HTMLInputElement;
  let pexelsOpen = false;

  const pickFile = () => ref.showPicker();
  const openPexels = () => (pexelsOpen = true);

  const onPexelImageSelect = async (src: string) => {
    photos = await uploadFileFromURL(src);
  };
</script>

<input type="hidden" {name} value={photo} />
<FilePicker bind:ref {mediaType} {multiple} bind:photos />

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
  <PhotoViewer withCross {photo} onCrossClick={() => (photos = {})} />
{/if}

<PexelsModal bind:open={pexelsOpen} onImageSelect={onPexelImageSelect} />
