<script lang="ts">
  import { loadPhotos, photos } from "$lib/stores/api/select";
  import { Plus } from "svelte-heros";
  import FilePicker from "./form/FilePicker.svelte";
  import { createPhotos } from "$lib/stores/api/create";
  import { PhotoViewer } from ".";

  let ref: HTMLInputElement;
  loadPhotos();
</script>

<section class="mt-4">
  <FilePicker mediaType="both" multiple bind:ref onNewPhotos={createPhotos} />
  <div class="flex items-center justify-between">
    <header class="text-h3 capitalize">Photos</header>
    <button class="text-primary" on:click={() => ref.showPicker()}>
      <Plus />
    </button>
  </div>

  <div class="mt-2 flex flex-wrap gap-4">
    {#each $photos as photo}
      <PhotoViewer photo={photo.id} maxHeight={false} small />
    {/each}
  </div>
</section>
