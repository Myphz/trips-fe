<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form, Select, Combobox, PhotoUploader, Datepicker } from "$lib/components/form";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  let test: any;
  const onSubmit = (data: { id: string }) => (test = data);
</script>

<Form {onSubmit} defaultValues={{ destination: "ciao", testoz: "2", wewe: "3" }}>
  <Input placeholder="Destination" name="destination" required />
  <div class="flex gap-4">
    <Datepicker name="departure" placeholder="Departure" />
    <Datepicker name="return" placeholder="Return" />
  </div>
  <Select
    name="currency"
    label="Currency"
    options={[
      { label: "a", value: "2" },
      { label: "b", value: "3" },
    ]}
  />
  <Combobox
    name="people"
    options={[
      { label: "a", value: "2" },
      { label: "b", value: "3" },
    ]}
    label="People"
  />

  <PhotoUploader />

  {JSON.stringify(test)}
</Form>
