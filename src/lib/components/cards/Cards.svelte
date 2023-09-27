<script lang="ts">
  import Trip from "./Trip.svelte";
  import Place from "./Place.svelte";
  import Lodging from "./Lodging.svelte";
  import Transport from "./Transport.svelte";
  import type { EntityType } from "$lib/types/api";
  import type { ComponentType } from "svelte";
  import { cards } from "$lib/stores/api/select";

  const components: Record<EntityType, ComponentType> = {
    trip: Trip,
    place: Place,
    lodging: Lodging,
    transport: Transport,
  };
</script>

<main class="flex h-full flex-col gap-8">
  {#each $cards as row (row.id)}
    {@const type = row.type}
    {@const component = components[type]}
    <svelte:component this={component} data={row} />
  {/each}
</main>
