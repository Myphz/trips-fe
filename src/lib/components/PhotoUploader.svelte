<script lang="ts">
  import { Photo } from "svelte-heros";
</script>

<button
  class="flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-primary py-2.5 text-small"
>
  <div class="text-primary">
    <Photo size="2rem" />
  </div>
  <span>Add photo</span>
</button>
