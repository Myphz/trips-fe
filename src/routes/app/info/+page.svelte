<script lang="ts">
  import { TripInfo } from "$lib/components/info";
  import { card, getSingle } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import type { GetRowTypes } from "$lib/types/api";
  import { getName } from "$utils/format";

  getSingle();
  $: setPageTitle(getName($card));
</script>

{#if $card}
  {#if $card.type === "trip"}
    <TripInfo />
  {/if}
{/if}
