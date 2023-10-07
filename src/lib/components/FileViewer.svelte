<script lang="ts">
  import type { photos } from "$lib/stores/api/select";
  import type { UnwrapWritable } from "$lib/stores/route";
  import { downloadOrViewFile } from "$utils/files";
  import { ArrowDownTray } from "svelte-heros";

  export let file: UnwrapWritable<typeof photos>[number];
</script>

<button class="flex w-full justify-between" on:click={() => downloadOrViewFile(file)}>
  <div>{file.name}</div>
  <div class="text-primary">
    <ArrowDownTray />
  </div>
</button>
