<script lang="ts">
  import { filter } from "$lib/stores/api/select";
  import { onMount } from "svelte";

  export let customDescription = "";
  let isAnimating: boolean;

  onMount(() => {
    isAnimating = true;
    setTimeout(() => (isAnimating = false), 100);
  });
</script>

<article
  class="epic-transition mt-10 flex w-full flex-col items-center justify-center text-gray {isAnimating &&
    'opacity-0'}"
>
  <img src="/empty.png" alt="Empty State" />
  <header class="text-h3">Adventure Awaits!</header>
  {#if !customDescription}
    {#if !$filter}
      <div>Start planning now</div>
      <div>
        Tap <span class="text-primary">+</span>
        to begin
      </div>
    {:else}
      <div>No {$filter === "trip" ? "entitie" : $filter}s found</div>
      <div>in the current trip.</div>
    {/if}
    <div>
      Tap <span class="text-primary">+</span>
      to begin
    </div>
  {:else}
    <div>Start planning now</div>
    <div>{customDescription}</div>
  {/if}
</article>
