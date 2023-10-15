<script lang="ts">
  import { paramsHistory } from "$lib/stores/route";
  import { ChevronRight } from "svelte-heros";
  import { derived } from "svelte/store";

  let history = derived(paramsHistory, ($paramsHistory) =>
    $paramsHistory.slice(
      $paramsHistory.findLastIndex((history) => history.entityId === 0) + 2,
    ),
  );
</script>

{#if $history.length}
  <header
    class="absolute -top-[2.25rem] flex w-full gap-2 border border-x-0 border-y-primary py-0.5 text-small text-gray"
  >
    {#each $history as slot (slot.entityId)}
      <div class="flex items-center gap-1">
        <span>{slot.title}</span>
        <ChevronRight size="0.8rem" />
      </div>
    {/each}
  </header>
{/if}
