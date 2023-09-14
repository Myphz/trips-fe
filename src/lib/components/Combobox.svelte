<script lang="ts" generics="T">
  import { createCombobox } from "svelte-headlessui";
  import { fade } from "svelte/transition";
  import { Check, ChevronDown } from "svelte-heros";

  type Option<T> = {
    label: string;
    value: T;
  };

  export let options: Option<T>[];
  export let label: string;
  export let selected = "";

  const combobox = createCombobox({ label });

  $: filtered = options.filter((option) =>
    option.label.toLowerCase().replace(/\s+/g, "").includes($combobox.filter.toLowerCase().replace(/\s+/g, "")),
  );

  $: selected = $combobox.selected?.value;
</script>

<div class="flex w-full flex-col items-center justify-center">
  <div class="fixed top-16 w-72">
    <div class="relative mt-1">
      <div
        class="focus-visible:ring-offset-teal-300 sm:text-sm relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
      >
        <input
          use:combobox.input
          class="text-sm text-gray-900 w-full border-none py-2 pl-3 pr-10 leading-5 focus:ring-0"
          value={$combobox.selected?.label ?? ""}
          on:focusout={(e) => {
            // @ts-ignore
            e.target.value = $combobox.selected?.label ?? "";
          }}
        />

        <button use:combobox.button class="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown />
        </button>
      </div>

      {#if $combobox.expanded}
        <ul
          transition:fade={{ duration: 100 }}
          use:combobox.items
          class="text-base sm:text-sm absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {#each filtered as value}
            {@const active = $combobox.active === value}
            {@const selected = $combobox.selected === value}
            <li
              class="relative cursor-pointer select-none py-2 pl-10 pr-4 {active || selected
                ? 'bg-primary text-white'
                : 'text-gray-900'}"
              use:combobox.item={{ value }}
            >
              <span class="block truncate {selected ? 'font-medium' : 'font-normal'}">{value.label}</span>
              {#if selected}
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 {active ? 'text-white' : 'text-teal-600'}"
                >
                  <Check />
                </span>
              {/if}
            </li>
          {:else}
            <li class="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900">
              <span class="block truncate font-normal">Nothing found</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
