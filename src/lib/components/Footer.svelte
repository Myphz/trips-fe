<script lang="ts">
  import { isMenuOpen, keyboardOpen } from "$lib/stores/ui";
  import { filter } from "$lib/stores/api/select";
  import FooterTabs from "./FooterTabs.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  const TABS = [
    { icon: "location_on", name: "trip" },
    { icon: "lunch_dining", name: "food" },
    { icon: "bed", name: "lodging" },
    { icon: "train", name: "transport" },
  ] as const;

  const openMenu = () => {
    isMenuOpen.set(true);
  };

  onMount(() => {
    if (!get(filter)) filter.set("trip");
  });
</script>

{#if !$keyboardOpen}
  <nav
    class="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-center gap-6 bg-footer px-6"
  >
    <FooterTabs tabs={TABS.slice(0, 2)} />

    <button
      on:click={openMenu}
      class="aspect-square w-16 -translate-y-1/2 rounded-full border-2 border-white bg-primary"
    >
      <span class="material-symbols-outlined text-[2.5rem] text-white">add</span>
    </button>

    <FooterTabs tabs={TABS.slice(2)} />
  </nav>
{/if}

<style>
  nav {
    box-shadow: 0px -10px 20px rgba(0, 0, 0, 0.5);
  }
</style>
