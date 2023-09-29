<script lang="ts">
  import Star from "./Star.svelte";

  export let rating: number;
  export let mode: "all" | "rating";
  export let size: "big" | "small" = "small";

  const MAX_STARS = 5;
</script>

<div class="flex gap-1">
  {#each { length: rating } as _}
    <Star {size} />
  {/each}

  {#if mode === "all"}
    {#each { length: MAX_STARS - rating } as _}
      <Star filled={false} {size} />
    {/each}
  {/if}
</div>
