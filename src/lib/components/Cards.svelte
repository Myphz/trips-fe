<script lang="ts">
  import { getMainTrips } from "$lib/stores/api/select";
  import Card from "./Card.svelte";
  const mainTrips = getMainTrips();
</script>

<main class="flex flex-col gap-8 overflow-x-hidden">
  {#await mainTrips then trips}
    {#each trips as trip}
      <!-- <Card destination={trip.destination} startDate={trip.start_date} endDate={trip.end_date} /> -->
      <Card destination={trip.destination} />
    {/each}
  {/await}
</main>
