<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form, Select, Combobox } from "$lib/components";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  const onSubmit = (data: { id: string }) => console.log(data);
</script>

<Form {onSubmit} defaultValues={{ destination: "ciao", testoz: "2", wewe: "3" }}>
  <Input placeholder="Destination" name="destination" required />
  <div class="flex gap-4">
    <Input placeholder="Departure" name="departure" />
    <Input placeholder="Return" name="return" />
  </div>
  <Select
    name="testoz"
    label="Currency"
    options={[
      { label: "a", value: "2" },
      { label: "b", value: "3" },
    ]}
  />
  <Combobox
    name="wewe"
    options={[
      { label: "a", value: "2" },
      { label: "b", value: "3" },
    ]}
    label="People"
  />
</Form>
