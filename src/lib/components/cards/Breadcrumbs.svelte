<script lang="ts">
  import { ChevronRight } from "svelte-heros";
  import { history } from "$lib/stores/route";
</script>

{#if $history.length > 1}
  <header
    class="absolute -top-[2.25rem] flex w-full gap-2 border border-x-0 border-y-primary py-0.5 text-small text-gray"
  >
    {#each $history.slice(1) as slot (slot.entityId)}
      <div class="flex items-center gap-1">
        <span>{slot.title}</span>
        <ChevronRight size="0.8rem" />
      </div>
    {/each}
  </header>
{/if}
