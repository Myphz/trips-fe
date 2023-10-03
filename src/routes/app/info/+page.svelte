<script lang="ts">
  import { TripInfo, LodgingInfo, PlaceInfo, TransportInfo } from "$lib/components/info";

  import { card } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import { getName } from "$utils/format";

  $: setPageTitle(getName($card));
</script>

{#if $card}
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
{/if}
