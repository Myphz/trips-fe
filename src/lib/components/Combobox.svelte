<script lang="ts">
  import { getContext } from "svelte";
  import { twMerge } from "tailwind-merge";

  import { createCombobox } from "svelte-headlessui";
  import { fade } from "svelte/transition";
  import { Check, ChevronDown } from "svelte-heros";

  type Option = {
    label: string;
    value: string;
  };

  export let options: Option[];
  export let label: string;
  export let name: string;

  const ctx = getContext<Record<string, string>>("defaultValues") ?? {};
  const selected = ctx[name] ? options.find((opt) => opt.value === ctx[name]) : null;
  const combobox = createCombobox(selected ? { selected } : {});

  $: filtered = options.filter((option) =>
    option.label.toLowerCase().replace(/\s+/g, "").includes($combobox.filter.toLowerCase().replace(/\s+/g, "")),
  );
</script>

<div class="group flex w-full flex-col items-center justify-center text-small text-gray">
  <input class="visually-hidden" value={$combobox.selected?.value ?? ""} {name} />

  <div class="w-full">
    <div class="relative h-[32px]">
      <div
        class={twMerge(
          "relative flex h-full w-full cursor-default items-center rounded-md border border-primary text-left",
          $combobox.expanded && "rounded-b-none border-b-primary",
        )}
      >
        <input
          use:combobox.input
          class="px-3"
          value={$combobox.selected?.label ?? ""}
          on:focusout={(e) => {
            // @ts-ignore
            e.target.value = $combobox.selected?.label ?? "";
          }}
        />
        <span
          class={twMerge(
            "bg epic-transition absolute top-1 mx-3 flex w-fit items-center truncate group-focus-within:-top-2 group-focus-within:text-xs",
            ($combobox.selected?.value || $combobox.expanded) && "-top-2 text-xs",
          )}
        >
          {label}
        </span>

        <button
          use:combobox.button
          class={twMerge(
            "epic-transition absolute inset-y-0 right-0 flex items-center pr-2",
            $combobox.expanded && "-translate-x-1/4 rotate-180",
          )}
        >
          <ChevronDown />
        </button>
      </div>

      {#if $combobox.expanded}
        <ul
          transition:fade={{ duration: 100 }}
          use:combobox.items
          class="bg absolute z-20 max-h-60 w-full overflow-auto rounded-b-md border border-t-0 border-primary"
        >
          {#each filtered as value}
            {@const active = $combobox.active === value}
            {@const selected = $combobox.selected === value}
            <li
              class="relative cursor-pointer select-none py-1 pl-10 pr-4 {active || selected
                ? 'bg-primary text-white'
                : ''}"
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
