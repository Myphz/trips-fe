<script lang="ts">
  import { filterCards, allCards, filter, filterOnly } from "$lib/stores/api/select";
  import type { EntityType } from "$lib/types/api";
  import { twMerge } from "tailwind-merge";

  export let tabs: { icon: string; name: EntityType }[];

  $: activeStatuses = tabs.map(
    ({ name }) => filterCards({ filt: name, data: $allCards }).length > 0,
  );
</script>

<div class="flex flex-1 justify-between">
  {#each tabs as { icon, name }, i}
    {@const isActive = $filter === name}
    {@const hasItems = activeStatuses[i]}
    <button
      on:click={() => filterOnly(name)}
      class={twMerge(
        "relative transition-all duration-100",
        isActive ? "text-primary" : "text-gray",
      )}
    >
      <span
        class={twMerge(
          "material-symbols-outlined text-[2.25rem] transition-all duration-100",
          isActive && "filled",
        )}
      >
        {icon}
      </span>

      {#if hasItems}
        <div class="absolute -right-1 top-0 aspect-square h-2 rounded-full bg-primary"></div>
      {/if}
    </button>
  {/each}
</div>
