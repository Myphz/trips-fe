<script lang="ts">
  import { card, select } from "$lib/stores/api/select";
  import { Plus } from "svelte-heros";
  import FilePicker from "./form/FilePicker.svelte";

  let ref: HTMLInputElement;

  $: photos = $card?.id
    ? select({ table: "photos", cond: { entity_id: $card?.id } })
    : Promise.resolve([]);

  let newPhotos: string[] = [];
  $: {
    console.log({ newPhotos });
  }
</script>

<section class="mt-4">
  <FilePicker mediaType="both" multiple bind:ref bind:photos={newPhotos} />
  <div class="flex items-center justify-between">
    <header class="text-h3 capitalize">Photos</header>
    <button class="text-primary" on:click={() => ref.showPicker()}>
      <Plus />
    </button>
  </div>

  {#await photos then photos}
    {#each photos as photo}
      <div>{photo}</div>
    {/each}
  {/await}
</section>
