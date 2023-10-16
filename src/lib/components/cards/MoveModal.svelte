<script lang="ts">
  import { move, pageTitle } from "$lib/stores/route";
  import { moveEntity } from "$lib/stores/routeParams";
  import { ArrowRight } from "svelte-heros";
  import Button from "../form/Button.svelte";
</script>

<div
  class="fixed bottom-16 left-0 z-50 flex w-full flex-col items-center gap-2 rounded-t-xl border border-primary bg-white px-4 py-2"
>
  <div class="flex items-center gap-2 text-h3">
    <span>{$moveEntity?.name}</span>
    <ArrowRight />
    <span>{$pageTitle}</span>
  </div>
  <div class="flex w-full justify-between gap-2">
    <Button on:click={move}>MOVE</Button>
    <Button variant="error" on:click={() => ($moveEntity = null)}>CANCEL</Button>
  </div>
</div>
