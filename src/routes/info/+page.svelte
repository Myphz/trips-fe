<script lang="ts">
  import {
    TripInfo,
    LodgingInfo,
    PlaceInfo,
    TransportInfo,
    FoodInfo,
  } from "$lib/components/info";

  import { card } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import { getName } from "$utils/format";
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";
  import { blur } from "svelte/transition";

  $: setPageTitle(getName($card));

  onMount(async () => {
    authGuard();
  });
</script>

{#if $card}
  <div transition:blur={{ duration: 100 }}>
    {#if $card.type === "trip"}
      <TripInfo />
    {/if}
    {#if $card.type === "lodging"}
      <LodgingInfo />
    {/if}
    {#if $card.type === "place"}
      <PlaceInfo />
    {/if}
    {#if $card.type === "transport"}
      <TransportInfo />
    {/if}
    {#if $card.type === "food"}
      <FoodInfo />
    {/if}
  </div>
{/if}
