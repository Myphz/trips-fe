<script lang="ts">
  import { loadPhotos, photos } from "$lib/stores/api/select";
  import FilePicker from "./form/FilePicker.svelte";
  import { createPhotos } from "$lib/stores/api/create";
  import { PhotoViewer } from ".";
  import Empty from "./cards/Empty.svelte";

  let ref: HTMLInputElement;
  loadPhotos();
</script>

<section class="mt-4">
  <div class="flex items-center justify-between">
    <header class="text-h3 capitalize">Photos</header>
    <button class="text-primary" on:click={() => ref.showPicker()}>
      <span class="material-symbols-outlined text-[2rem]">add</span>
    </button>
  </div>

  <FilePicker mediaType="both" multiple bind:ref onNewPhotos={createPhotos} />

  <div class="mt-2 flex flex-wrap gap-4">
    {#if $photos.length}
      {#each $photos as photo}
        <PhotoViewer {photo} maxHeight={false} withDelete />
      {/each}
    {:else}
      <Empty customDescription="No photos uploaded yet..." />
    {/if}
  </div>
</section>
