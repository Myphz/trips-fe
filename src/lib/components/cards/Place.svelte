<script lang="ts">
  import type { GetRowType } from "$lib/types/api";
  import { dateToCard } from "$utils/format";
  import CardBase from "./CardBase.svelte";

  export let data: GetRowType<"place">;
</script>

<CardBase {data}>
  <svelte:fragment slot="header">
    {#if data.date}
      <div class="text-xs">{dateToCard(data.date)}</div>
    {/if}
  </svelte:fragment>
</CardBase>
