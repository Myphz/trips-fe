<script lang="ts">
  import { TripInfo } from "$lib/components/info";
  import { card } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import { getName } from "$utils/format";

  $: setPageTitle(getName($card));
</script>

{#if $card}
  {#if $card.type === "trip"}
    <TripInfo />
  {/if}
{/if}
