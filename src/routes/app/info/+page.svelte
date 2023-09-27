<script lang="ts">
  import { routeParams } from "$lib/stores/route";

  const { entityId } = routeParams ?? {};
</script>

<div>{$entityId}</div>
