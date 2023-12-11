<script lang="ts">
  import Home from "$lib/assets/icons/home.svg?raw";
  import Bed from "$lib/assets/icons/bed.svg?raw";
  import Train from "$lib/assets/icons/train.svg?raw";
  import Trip from "$lib/assets/icons/trip.svg?raw";
  import { keyboardOpen } from "$lib/stores/ui";
  import { filter, filterOnly } from "$lib/stores/api/select";
  import Redirect from "./Redirect.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  const TABS = [
    { icon: Trip, name: "trip" },
    { icon: Bed, name: "lodging" },
    { icon: Train, name: "transport" },
  ] as const;

  onMount(() => {
    if (!get(filter)) filter.set("trip");
  });
</script>

{#if !$keyboardOpen}
  <nav
    class="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-primary px-9"
  >
    <Redirect params={{ entityId: 0, parent: 0, tripId: 0 }} href="/" classes="text-tab">
      {@html Home}
    </Redirect>
    {#each TABS as { icon, name }}
      <button
        on:click={() => filterOnly(name)}
        class={$filter === name ? "text-white dark:text-black" : "text-tab"}
      >
        {@html icon}
      </button>
    {/each}
  </nav>
{/if}
