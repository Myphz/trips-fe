<script lang="ts">
  import Star from "./Star.svelte";

  export let number: number;
</script>

<div class="flex gap-1">
  {#each { length: number } as _}
    <Star />
  {/each}
</div>
