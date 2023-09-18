<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form } from "$lib/components";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  const onSubmit = (data: { id: string }) => console.log(data);
</script>

<div>wewe</div>

<Form {onSubmit}>
  <Input placeholder="Destination" name="test" />
  <Input placeholder="Destination" name="test" />
</Form>
