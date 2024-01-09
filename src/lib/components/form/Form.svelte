<script lang="ts" generics="T extends object">
  import { writable, type Writable } from "svelte/store";

  import { isUploading } from "$lib/stores/files/upload";

  import { setContext } from "svelte";
  import Button from "./Button.svelte";
  import { BarLoader } from "svelte-loading-spinners";

  export let isEdit = false;
  export let defaultValues: Writable<Record<string, string>> = writable({});
  export let onSubmit: (data: T) => unknown;
  export let autocomplete = "off";
  export let buttonText: string;
  export let classes = "";

  let loading = false;

  setContext("defaultValues", defaultValues);

  const realSubmit = async (e: SubmitEvent) => {
    if (loading) return;
    loading = true;

    e.preventDefault();
    const tempData = Object.fromEntries(new FormData(e.target as HTMLFormElement));

    const data = Object.fromEntries(
      Object.entries(tempData)
        // Filter out empty values and values with 2 underscores if it's not edit
        .filter(([key, val]) => !key.startsWith("__") && (isEdit || !!val))
        .map(([key, val]) => {
          // Try to convert to JSON
          try {
            const newValue = JSON.parse(val as string);
            if (typeof newValue === "number") throw new Error();

            if (typeof newValue !== "object") return [key, newValue];
            return [...Object.entries(newValue)];
          } catch {
            return [key, val];
          }
        })
        // If it's a nested array, flatten it
        .reduce((prev, curr) => {
          if (!Array.isArray(curr[0])) return [...prev, curr];
          return [...prev, ...curr];
        }, []),
    ) as T;

    await onSubmit(data);

    loading = false;
  };
</script>

<form on:submit={realSubmit} {autocomplete} class={classes}>
  <div class="flex select-none flex-col gap-4 text-gray">
    <slot />
  </div>
  <div class="mt-10 flex gap-2">
    <Button submit disabled={$isUploading || loading}>
      <div class="relative flex w-full flex-col items-center justify-center">
        <span>{loading ? "LOADING" : buttonText}</span>
        {#if loading}
          <BarLoader size="50" color="currentColor" />
        {/if}
      </div>
    </Button>
  </div>
</form>
