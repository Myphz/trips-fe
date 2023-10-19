<script lang="ts">
  import { Photo } from "svelte-heros";
  import { PhotoViewer } from "..";
  import { getContext } from "svelte";
  import FilePicker from "./FilePicker.svelte";
  import { Button } from ".";
  import { getPexelsPhoto } from "$utils/pexels";
  import PexelsModal from "./PexelsModal.svelte";
  import { uploadFileFromURL } from "$lib/stores/files/upload";

  export let mediaType: "image" | "video" | "both";
  export let name: string;
  export let multiple = false;

  const ctx = getContext<Record<string, Record<string, string>>>("defaultValues") ?? {};
  let photos = ctx[name] ?? {};
  if (typeof photos === "string") photos = { unknown: photos };

  $: photo = photos[Object.keys(photos)?.[0]] ?? "";

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
        <Photo size="2rem" />
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
