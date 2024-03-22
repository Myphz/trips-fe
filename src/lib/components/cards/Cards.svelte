<script lang="ts">
  import Trip from "./Trip.svelte";
  import Place from "./Place.svelte";
  import Lodging from "./Lodging.svelte";
  import Transport from "./Transport.svelte";
  import Loading from "./Loading.svelte";
  import Food from "./Food.svelte";

  import type { EntityType } from "$lib/types/api";
  import type { ComponentType } from "svelte";
  import { cards, loading } from "$lib/stores/api/select";
  import Empty from "./Empty.svelte";
  import Breadcrumbs from "./Breadcrumbs.svelte";

  const components: Record<EntityType, ComponentType> = {
    trip: Trip,
    place: Place,
    lodging: Lodging,
    transport: Transport,
    food: Food,
  };
</script>

<Breadcrumbs />

<main class="flex h-full flex-col gap-8">
  {#if !$loading}
    {#if $cards.length}
      {#each $cards as row (row.id)}
        {@const type = row.type}
        {@const component = components[type]}
        <svelte:component this={component} data={row} />
      {/each}
    {:else}
      <Empty />
    {/if}
  {:else}
    <Loading />
  {/if}
</main>
