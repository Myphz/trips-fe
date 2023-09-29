<script lang="ts">
  export let value: string;
  let placeholder = "Add description...";
</script>

<textarea class="min-h-textarea w-full resize-y rounded-md border border-primary p-2" {placeholder} bind:value />
