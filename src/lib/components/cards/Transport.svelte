<script lang="ts">
  import type { GetRowType } from "$lib/types/api";
  import { datetimeToCard } from "$utils/format";
  import CardBase from "./CardBase.svelte";

  export let data: GetRowType<"transport">;
</script>

<CardBase {data}>
  <svelte:fragment slot="header">
    {#if data.departure && data.arrival}
      <div class="flex gap-1 text-xs">
        <div class="text-xs">{datetimeToCard(data.departure)}</div>
        <span>-</span>
        <div class="text-xs">{datetimeToCard(data.arrival)}</div>
      </div>
    {/if}
  </svelte:fragment>
</CardBase>
