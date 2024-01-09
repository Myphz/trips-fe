<script lang="ts">
  import { keyboardOpen } from "$lib/stores/ui";
  import { filter, filterCards, filterOnly, allCards } from "$lib/stores/api/select";
  import Redirect from "./Redirect.svelte";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { Icon } from "@steeze-ui/svelte-icon";
  import { Bed, Home, PinDrop, Train } from "@steeze-ui/material-design-icons";

  const TABS = [
    { icon: PinDrop, name: "trip" },
    { icon: Bed, name: "lodging" },
    { icon: Train, name: "transport" },
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
    <Redirect params={{ entityId: 0, parent: 0, tripId: 0 }} href="/" classes="text-tab">
      <Icon src={Home} size="2.25rem" />
    </Redirect>
    {#each TABS as { icon, name }, i}
      {@const isActive = $filter === name}
      {@const hasItems = activeStatuses[i]}
      <button
        on:click={() => filterOnly(name)}
        class={isActive ? "relative text-white dark:text-black" : "relative text-tab"}
      >
        <Icon src={icon} size="2.25rem" />
        {#if hasItems}
          <div class="absolute -right-1 top-0 aspect-square h-2 rounded-full bg-tab"></div>
        {/if}
      </button>
    {/each}
  </nav>
{/if}
