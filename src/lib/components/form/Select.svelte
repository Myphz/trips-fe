<script lang="ts">
  import { getContext } from "svelte";
  import { twMerge } from "tailwind-merge";

  import { createListbox } from "svelte-headlessui";
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
  const listbox = createListbox(selected ? { selected } : {});
</script>

<div class="group flex w-full flex-col items-center justify-center text-small text-gray">
  <input class="visually-hidden" value={$listbox.selected?.value ?? ""} {name} />
  <div class="w-full">
    <div class="relative h-10">
      <button
        use:listbox.button
        class={twMerge(
          "relative mt-2 h-8 w-full cursor-default rounded-md border border-primary text-left",
          $listbox.expanded && "rounded-b-none border-b-primary",
        )}
      >
        <span class="absolute top-1 flex items-center truncate px-3">{$listbox.selected?.label ?? ""}</span>
        <span
          class={twMerge(
            "bg epic-transition absolute top-1 z-30 mx-3 flex w-fit items-center truncate",
            ($listbox.selected?.value || $listbox.expanded) && "-top-2 text-xs",
          )}
        >
          {label}
        </span>

        <span
          class={twMerge(
            "epic-transition pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",
            $listbox.expanded && "-translate-x-1/4 rotate-180",
          )}
        >
          <ChevronDown />
        </span>
      </button>

      {#if $listbox.expanded}
        <ul
          transition:fade={{ duration: 100 }}
          use:listbox.items
          class="bg absolute z-40 max-h-60 w-full overflow-auto rounded-b-md border border-t-0 border-primary"
        >
          {#each options as option}
            {@const active = $listbox.active === option}
            {@const selected = $listbox.selected === option}
            <li
              class="relative cursor-pointer select-none py-1 pl-10 pr-4 {active || selected
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
