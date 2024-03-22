<script lang="ts">
  import { keyboardOpen } from "$lib/stores/ui";
  import { filter, filterCards, filterOnly, allCards } from "$lib/stores/api/select";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  const TABS = [
    { icon: "location_on", name: "trip" },
    { icon: "lunch_dining", name: "food" },
    { icon: "bed", name: "lodging" },
    { icon: "train", name: "transport" },
  ] as const;

  $: activeStatuses = TABS.map(
    ({ name }) => filterCards({ filt: name, data: $allCards }).length > 0,
  );

  onMount(() => {
    if (!get(filter)) filter.set("trip");
  });
</script>

{#if !$keyboardOpen}
  <nav
    class="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-primary px-9"
  >
    {#each TABS as { icon, name }, i}
      {@const isActive = $filter === name}
      {@const hasItems = activeStatuses[i]}
      <button
        on:click={() => filterOnly(name)}
        class={isActive ? "relative text-white dark:text-black" : "relative text-tab"}
      >
        <span class="material-symbols-outlined filled text-[2.25rem]">
          {icon}
        </span>

        {#if hasItems}
          <div class="absolute -right-1 top-0 aspect-square h-2 rounded-full bg-tab"></div>
        {/if}
      </button>
    {/each}
  </nav>
{/if}
