<script lang="ts">
  import type { photos } from "$lib/stores/api/select";
  import type { UnwrapWritable } from "$lib/types/route";
  import { downloadOrViewFile } from "$utils/files";
  import { ArrowDownTray } from "svelte-heros";

  export let file: UnwrapWritable<typeof photos>[number];
</script>

<button class="flex w-full justify-between" on:click={() => downloadOrViewFile(file)}>
  <div class="text-left">{file.name}</div>
  <div class="text-primary">
    <ArrowDownTray />
  </div>
</button>
