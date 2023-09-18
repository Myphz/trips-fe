<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import Input from "$lib/components/Input.svelte";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");
</script>

<div>wewe</div>
<Input placeholder="Destination" name="test" />
