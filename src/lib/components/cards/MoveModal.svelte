<script lang="ts">
  import { history, pageTitle } from "$lib/stores/route";
  import { moveEntity } from "$lib/stores/routeParams";
  import Button from "../form/Button.svelte";
  import { move } from "$lib/stores/api/update";
</script>

<!-- Render only if it's not inside itself? -->
{#if !$history.some((hist) => hist.entityId === $moveEntity?.id)}
  <div
    class="fixed bottom-16 left-0 z-50 flex w-full flex-col items-center gap-2 rounded-t-xl border border-primary bg-white px-4 py-2"
  >
    <div class="flex items-center gap-2 text-h3">
      <span>{$moveEntity?.name}</span>
      <span class="material-symbols-outlined text-[2rem]">arrow_forward</span>
      <span>{$pageTitle}</span>
    </div>
    <div class="flex w-full justify-between gap-2">
      <Button variant="outlined-error" on:click={() => ($moveEntity = null)}>Cancel</Button>
      <Button on:click={move}>Move</Button>
    </div>
  </div>
{/if}
