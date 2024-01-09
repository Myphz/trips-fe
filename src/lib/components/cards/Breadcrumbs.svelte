<script lang="ts">
  import { history } from "$lib/stores/route";
</script>

{#if $history.length > 1}
  <header
    class="absolute -top-[2.25rem] flex w-full max-w-full gap-2 overflow-hidden border border-x-0 border-y-primary py-0.5 text-small text-gray"
  >
    {#each $history.slice(1) as slot (slot.entityId)}
      <div class="flex items-center gap-1 text-ellipsis">
        <span>{slot.title}</span>
        <span class="material-symbols-outlined text-[1rem]">chevron_right</span>
      </div>
    {/each}
  </header>
{/if}
