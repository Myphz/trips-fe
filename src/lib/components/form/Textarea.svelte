<script lang="ts">
  export let value: string;
  let placeholder = "Add description...";
</script>

<textarea
  on:blur
  on:input
  class="min-h-textarea w-full resize-y rounded-md border border-primary p-2"
  {placeholder}
  bind:value
/>
