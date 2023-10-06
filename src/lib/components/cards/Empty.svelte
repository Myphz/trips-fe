<script lang="ts">
  import { filter } from "$lib/stores/api/select";

  export let customDescription = "";
</script>

<article class="mt-10 flex w-full flex-col items-center justify-center text-gray">
  <img src="/empty.png" alt="Empty State" />
  {#if !$filter}
    <header class="text-h3">Adventure Awaits!</header>
    <div>Start planning now</div>
    {#if !customDescription}
      <div>
        Tap <span class="text-primary">+</span>
        to begin
      </div>
    {:else}
      <div>{customDescription}</div>
    {/if}
  {:else}
    <header class="text-h3">Adventure Awaits!</header>
    <div>No {$filter}s found</div>
    <div>in the current trip.</div>
  {/if}
</article>
