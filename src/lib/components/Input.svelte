<script lang="ts">
  export let placeholder: string;
  export let required = true;
  export let name: string;
</script>

<label class="gray group relative block h-10 w-full text-small">
  <input class="absolute inset-0 mt-auto h-8 w-full rounded-md border border-primary p-2" {required} {name} />
  <div
    class="bg label-transition absolute left-2 top-3 rounded-md px-1 group-focus-within:-top-0 group-focus-within:text-xs"
  >
    {placeholder}{required ? "*" : ""}
  </div>
</label>

<style>
  .label-transition {
    transition: all 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
</style>
