<script lang="ts">
  import type { Option } from "$lib/types/other";
  import { getContext, onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  import { createCombobox } from "svelte-headlessui";
  import { fade } from "svelte/transition";

  export let options: Option[];
  export let label: string;
  export let name = "";
  export let onSelect: (value: string) => unknown = () => true;
  export let multipleSelected: Array<string> = [];
  export let multiple = false;
  export let onInput: (value: string) => unknown = () => 1;

  let inputRef: HTMLInputElement;

  const ctx = getContext<Record<string, string>>("defaultValues") ?? {};
  const selected = ctx[name] ? options.find((opt) => opt.value === ctx[name]) : null;
  const combobox = createCombobox(selected ? { selected } : {});

  let isInputFilled = false;

  const realOnSelect = (e: Event) => {
    const selected = (e as CustomEvent).detail.selected;
    const displaySelected = onSelect(selected.value);

    if (displaySelected) inputRef.value = selected.label;
    else inputRef.value = "";
  };

  const realOnInput = (e: Event) => {
    const target = e.target || {};
    if (!("value" in target) || typeof target.value !== "string") return;
    isInputFilled = !!target.value;
    onInput(target.value);
  };
  onMount(() => {
    if (selected) inputRef.value = selected.label;
    if (ctx[name] && !selected) {
      inputRef.value = ctx[name];
      isInputFilled = true;
    }
  });

  $: filtered = options.filter((option) =>
    option.label
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes($combobox.filter.toLowerCase().replace(/\s+/g, "")),
  );
</script>

<div class="group flex w-full flex-col items-center justify-center text-small text-gray">
  <input class="visually-hidden" value={$combobox.selected?.value ?? ""} {name} />

  <div class="w-full">
    <div class="relative h-10">
      <div
        class={twMerge(
          "relative mt-2 flex h-8 w-full cursor-default items-center rounded-md border border-primary text-left",
          $combobox.expanded && "rounded-b-none border-b-primary",
        )}
      >
        <input
          use:combobox.input
          on:select={realOnSelect}
          on:input={realOnInput}
          class="z-30 w-[90%] text-ellipsis px-3 text-black"
          bind:this={inputRef}
          on:focusout={() => {
            inputRef.value = multiple ? "" : $combobox.selected?.label ?? "";
          }}
        />
        <span
          class={twMerge(
            "epic-transition absolute top-1 mx-3 flex w-fit items-center truncate bg-white group-focus-within:-top-2 group-focus-within:text-xs",
            ($combobox.selected?.value || $combobox.expanded || isInputFilled) &&
              "-top-2 text-xs",
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
          <span class="material-symbols-outlined text-[2rem]">expand_more</span>
        </button>
      </div>

      {#if $combobox.expanded}
        <ul
          transition:fade={{ duration: 100 }}
          use:combobox.items
          class="absolute z-40 max-h-60 w-full overflow-auto rounded-b-md border border-t-0 border-primary bg-white text-black"
        >
          {#each filtered as option}
            {@const active = $combobox.active === option}
            {@const selected = multiple
              ? multipleSelected.includes(option.value)
              : $combobox.selected === option}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
              class="relative cursor-pointer select-none py-1 pl-10 pr-4 {active || selected
                ? 'bg-primary text-white'
                : ''}"
              on:click={() => {
                if (multiple) return;
                // Unfocus input element
                setTimeout(() => {
                  const tmp = document.createElement("input");
                  document.body.appendChild(tmp);
                  tmp.focus();
                  document.body.removeChild(tmp);
                }, 50);
              }}
              use:combobox.item={{ value: option }}
            >
              <span class="block truncate {selected ? 'font-medium' : 'font-normal'}">
                {option.label}
              </span>
              {#if selected}
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 {active &&
                    'text-white'}"
                >
                  <span class="material-symbols-outlined text-[1.5rem]">done</span>
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
