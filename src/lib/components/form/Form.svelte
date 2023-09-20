<script lang="ts" generics="T extends object">
  import { setContext } from "svelte";
  import Button from "./Button.svelte";

  export let defaultValues: Record<string, string> = {};
  export let onSubmit: (data: T) => unknown;
  export let autocomplete = "off";
  export let buttonText: string;

  setContext("defaultValues", defaultValues);

  const realSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const tempData = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    const data = Object.fromEntries(
      Object.entries(tempData).map(([key, val]) => {
        // Try to convert to JSON
        try {
          const newValue = JSON.parse(val as string);
          return [key, newValue];
        } catch {
          return [key, val];
        }
      }),
    ) as T;

    onSubmit(data);
  };
</script>

<form on:submit={realSubmit} {autocomplete}>
  <div class="flex select-none flex-col gap-4 text-gray">
    <slot />
  </div>
  <div class="mt-8"><Button submit>{buttonText}</Button></div>
</form>
