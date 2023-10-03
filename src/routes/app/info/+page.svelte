<script lang="ts">
  import { TripInfo } from "$lib/components/info";
  import LodgingInfo from "$lib/components/info/LodgingInfo.svelte";
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
{/if}
