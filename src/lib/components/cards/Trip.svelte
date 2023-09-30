<script lang="ts">
  import type { GetRowType } from "$lib/types/api";
  import { dateToCard } from "$utils/format";
  import CardBase from "./CardBase.svelte";

  export let data: GetRowType<"trip">;
</script>

<CardBase {data}>
  <svelte:fragment slot="header">
    {#if data.start && data.end}
      <div class="flex gap-1 text-xs">
        <div class="text-xs">{dateToCard(data.start)}</div>
        <span>-</span>
        <div class="text-xs">{dateToCard(data.end)}</div>
      </div>
    {/if}
  </svelte:fragment>
</CardBase>
