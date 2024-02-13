<script lang="ts">
  import { currentPhoto } from "$lib/stores/files/upload";
  import { closeModal } from "$lib/stores/modals";
  import { datetimeToDDMMYYYY } from "$utils/format";
  import { Button } from "../form";

  $: mapsLink =
    $currentPhoto.latitude && $currentPhoto.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${$currentPhoto.latitude},${$currentPhoto.longitude}`
      : null;
</script>

<section class="flex flex-col gap-4 text-center">
  <header class="text-h3">Photo Info</header>

  <div class="flex justify-between text-regular text-gray">
    <span class="text-left">Date</span>
    <span class="text-right">
      {$currentPhoto.created_at ? datetimeToDDMMYYYY($currentPhoto.created_at) : "Unknown"}
    </span>
  </div>

  <div class="flex justify-between text-regular text-gray">
    <span class="text-left">Location</span>
    <span class="text-right">
      {#if mapsLink}
        <a href={mapsLink} class="text-primary">Open on Maps</a>
      {:else}
        <span>Unknown</span>
      {/if}
    </span>
  </div>

  <Button variant="primary" on:click={closeModal}>Close</Button>
</section>
