<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form } from "$lib/components";
  import Select from "$lib/components/Select.svelte";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  const onSubmit = (data: { id: string }) => console.log(data);
</script>

<Form {onSubmit}>
  <Input placeholder="Destination" name="destination" required />
  <div class="flex gap-4">
    <Input placeholder="Departure" name="departure" />
    <Input placeholder="Return" name="return" />
  </div>
  <Select
    name="testoz"
    label="Currency"
    options={[
      { label: "a", value: 2 },
      { label: "b", value: 2 },
    ]}
  />
</Form>
