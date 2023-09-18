<script lang="ts">
  import { routeParams } from "$lib/stores/route";

  const { infoId } = routeParams;
</script>

<div>{$infoId}</div>
