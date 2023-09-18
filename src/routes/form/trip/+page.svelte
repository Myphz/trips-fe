<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");
</script>

<div>we</div>
