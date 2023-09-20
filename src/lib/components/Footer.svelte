<script lang="ts">
  import Home from "$lib/assets/icons/home.svg?raw";
  import Bed from "$lib/assets/icons/bed.svg?raw";
  import Train from "$lib/assets/icons/train.svg?raw";
  import Trip from "$lib/assets/icons/trip.svg?raw";
  import { page } from "$app/stores";
  import { keyboardOpen } from "$lib/stores/ui";

  const TABS = [
    { icon: Home, path: "/app" },
    { icon: Trip, path: "/app/trips" },
    { icon: Bed, path: "/app/lodgings" },
    { icon: Train, path: "/app/transport" },
  ];
</script>

{#if !$keyboardOpen}
  <nav class="fixed bottom-0 flex h-16 w-full items-center justify-between bg-primary px-9">
    {#each TABS as { icon, path }}
      <a class={$page.route.id === path ? "text-white" : "text-tab"} href={path}>
        {@html icon}
      </a>
    {/each}
  </nav>
{/if}
