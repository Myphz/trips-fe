<script lang="ts">
  import { routeParams } from "$lib/stores/route";

  const { a } = routeParams;
</script>

<div>{$a}</div>
