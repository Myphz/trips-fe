<script lang="ts">
  import Star from "./Star.svelte";

  export let rating: number;
  export let mode: "all" | "rating";
  export let size: "big" | "small" = "small";
  export let onSelect: (n: number) => unknown = () => {};

  const MAX_STARS = 5;
</script>

<div class="flex gap-1">
  {#each { length: rating } as _, i}
    <button on:click={() => onSelect(i + 1)}>
      <Star {size} />
    </button>
  {/each}

  {#if mode === "all"}
    {#each { length: MAX_STARS - rating } as _, i}
      <button on:click={() => onSelect(rating + i + 1)}>
        <Star filled={false} {size} />
      </button>
    {/each}
  {/if}
</div>
