<script lang="ts">
  import { select } from "$lib/stores/api";
  import Card from "./Card.svelte";

  const data = select({ table: "trips" });
</script>

<main class="flex flex-col gap-8">
  {#await data then data}
    {#each data as trip}
      <Card destination={trip.destination} startDate={trip.start_date} endDate={trip.end_date} />
    {/each}
  {/await}
</main>
