<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import { twMerge } from "tailwind-merge";

  export let placeholder: string;
  export let required = false;
  export let name: string;
  export let type = "text";
  export let numeric = false;

  const ctx = getContext<Writable<Record<string, string>>>("defaultValues") ?? writable({});

  let ref: HTMLInputElement;
  $: startValue = $ctx[name];

  let invalid = false;
  let isFilled = !!startValue;

  onMount(() => {
    if (startValue) ref.value = startValue;
    isFilled = !!startValue;
  });

  $: {
    if (ref && !ref.value && startValue) {
      ref.value = startValue;
      isFilled = !!startValue;
    }
  }

  const onInput = () => {
    if (type === "text") ref.value = ref.value.trimStart();
    isFilled = !!ref.value;
  };
</script>

<label class="group relative block h-10 w-full text-small text-gray">
  <input
    class={twMerge(
      "peer absolute inset-0 mt-auto h-8 w-full rounded-md border border-primary p-2 text-black",
      invalid && "border-error",
    )}
    on:input
    on:keydown
    on:invalid={() => {
      invalid = true;
    }}
    on:input={() => {
      if (invalid) invalid = false;
    }}
    bind:this={ref}
    {type}
    {required}
    {name}
    on:input={onInput}
    placeholder=" "
    {...numeric && { inputmode: "numeric" }}
  />
  <div
    class={twMerge(
      "epic-transition absolute left-2 top-3 rounded-md bg-white px-1 text-small group-focus-within:top-0 group-focus-within:text-xs",
      isFilled && "!top-0 !text-xs",
    )}
  >
    {placeholder}{required ? "*" : ""}
  </div>
</label>
