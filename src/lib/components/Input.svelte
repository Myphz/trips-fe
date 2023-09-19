<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { twMerge } from "tailwind-merge";

  export let placeholder: string;
  export let required = false;
  export let name: string;
  export let type = "text";

  const ctx = getContext<Record<string, string>>("defaultValues") ?? {};

  let ref: HTMLInputElement;
  const startValue = ctx[name] ?? null;
  let invalid = false;

  onMount(() => {
    ref.value = startValue;
  });

  const onInput = () => {
    if (type !== "text") return;
    ref.value = ref.value.trimStart();
  };
</script>

<label class="gray group relative block h-10 w-full text-small">
  <input
    class={twMerge(
      "peer absolute inset-0 mt-auto h-8 w-full rounded-md border border-primary p-2",
      invalid && "border-error",
    )}
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
    placeholder=""
  />
  <div
    class={twMerge(
      "bg epic-transition absolute left-2 top-3 rounded-md px-1 text-small group-focus-within:top-0 group-focus-within:text-xs",
      ref?.value && "!top-0 !text-xs",
    )}
  >
    {placeholder}{required ? "*" : ""}
  </div>
</label>
