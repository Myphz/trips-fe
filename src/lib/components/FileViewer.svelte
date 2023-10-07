<script lang="ts">
  import type { photos } from "$lib/stores/api/select";
  import type { UnwrapWritable } from "$lib/stores/route";

  export let file: UnwrapWritable<typeof photos>[number];
</script>

<div>wewe {file}</div>
