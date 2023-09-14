<script lang="ts" generics="T">
  import { createListbox } from "svelte-headlessui";
  import { fade } from "svelte/transition";
  import { Check, ChevronDown } from "svelte-heros";

  type Option<T> = {
    label: string;
    value: T;
  };

  export let options: Option<T>[];
  export let label: string;
  export let selected = "";

  const listbox = createListbox({ label });

  $: selected = $listbox.selected?.value;
</script>

<div class="flex w-full flex-col items-center justify-center">
  <div class="fixed top-16 w-72">
    <div class="relative mt-1">
      <button
        use:listbox.button
        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2"
      >
        <span class="block min-h-[30px] truncate">{$listbox.selected?.label ?? ""}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown />
        </span>
      </button>

      {#if $listbox.expanded}
        <ul
          transition:fade={{ duration: 100 }}
          use:listbox.items
          class="text-base sm:text-sm absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {#each options as option}
            {@const active = $listbox.active === option}
            {@const selected = $listbox.selected === option}
            <li
              class="relative cursor-pointer select-none py-2 pl-10 pr-4 {active || selected
                ? 'bg-primary text-white'
                : ''}"
              use:listbox.item={{ value: option }}
            >
              <span class="block truncate {selected ? 'font-medium' : 'font-normal'}">{option.label}</span>
              {#if selected}
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Check />
                </span>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
