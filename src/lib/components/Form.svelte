<script lang="ts" generics="T extends object">
  import Button from "./Button.svelte";

  export let onSubmit: (data: T) => unknown;

  const realSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as T;
    onSubmit(data);
  };
</script>

<form on:submit={realSubmit}>
  <div class="flex flex-col gap-4">
    <slot />
  </div>
  <div class="mt-8"><Button submit>ADD</Button></div>
</form>
