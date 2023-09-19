<script lang="ts" generics="T extends object">
  import { setContext } from "svelte";
  import Button from "./Button.svelte";

  export let defaultValues: Record<string, string> = {};
  export let onSubmit: (data: T) => unknown;
  export let autocomplete = "off";

  setContext("defaultValues", defaultValues);

  const realSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as T;
    onSubmit(data);
  };
</script>

<form on:submit={realSubmit} {autocomplete}>
  <div class="flex select-none flex-col gap-4 text-gray">
    <slot />
  </div>
  <div class="mt-8"><Button submit>ADD</Button></div>
</form>