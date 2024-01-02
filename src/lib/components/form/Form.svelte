<script lang="ts" generics="T extends object">
  import { isUploading } from "$lib/stores/files/upload";

  import { setContext } from "svelte";
  import Button from "./Button.svelte";
  import { BarLoader } from "svelte-loading-spinners";

  export let isEdit = false;
  export let defaultValues: Record<string, string> = {};
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
        // Filter out empty values if it's not edit and __keys
        .filter(([key, val]) => !key.startsWith("__") && (isEdit || !!val))
        .map(([key, val]) => {
          // Try to convert to JSON
          try {
            const newValue = JSON.parse(val as string);
            if (typeof newValue === "number") throw new Error();
            return [key, newValue];
          } catch {
            return [key, val];
          }
        }),
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
