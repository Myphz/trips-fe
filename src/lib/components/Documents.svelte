<script lang="ts">
  import { loadPhotos, photos } from "$lib/stores/api/select";
  import FilePicker from "./form/FilePicker.svelte";
  import { createPhotos } from "$lib/stores/api/create";
  import { FileViewer } from ".";
  import Empty from "./cards/Empty.svelte";
  import type { FilePickerRef } from "$lib/types/other";

  let ref: FilePickerRef;
  loadPhotos();
</script>

<section class="mt-4">
  <div class="flex items-center justify-between">
    <header class="text-h3 capitalize">Files</header>
    <button class="text-primary" on:click={() => ref.showPicker()}>
      <span class="material-symbols-outlined text-[2rem]">add</span>
    </button>
  </div>

  <FilePicker mediaType="any" multiple bind:ref onNewPhotos={createPhotos} />

  <div class="mt-2 flex flex-col gap-2">
    {#if $photos.length}
      {#each $photos as photo}
        <FileViewer file={photo} />
      {/each}
    {:else}
      <Empty customDescription="No files uploaded yet..." />
    {/if}
  </div>
</section>
