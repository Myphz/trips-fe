<script lang="ts">
  import { getAll } from "$lib/stores/api/select";
  import Trip from "./Trip.svelte";
  import Place from "./Place.svelte";
  import Lodging from "./Lodging.svelte";
  import Transport from "./Transport.svelte";
  import type { EntityType } from "$lib/types/api";
  import type { ComponentType } from "svelte";

  const data = getAll();
  const components: Record<EntityType, ComponentType> = {
    trip: Trip,
    place: Place,
    lodging: Lodging,
    transport: Transport,
  };
</script>

<main class="flex flex-col gap-8 overflow-x-hidden">
  {#await data then rows}
    {#each rows as row}
      {@const type = row.type}
      {@const component = components[type]}
      <svelte:component this={component} data={row} />
    {/each}
  {/await}
</main>
