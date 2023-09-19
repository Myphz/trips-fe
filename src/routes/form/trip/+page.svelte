<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form, Select, PhotoUploader, Datepicker, PeopleSelector } from "$lib/components/form";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  let test: any;
  const onSubmit = (data: { id: string }) => {
    test = data;
    console.log(data);
  };
</script>

<Form {onSubmit}>
  <Input placeholder="Destination" name="destination" required />
  <div class="flex gap-4">
    <Datepicker name="departure" placeholder="Departure" />
    <Datepicker name="return" placeholder="Return" />
  </div>
  <Select
    name="currency"
    label="Currency"
    options={[
      { label: "Daniel", value: "2" },
      { label: "b", value: "3" },
    ]}
  />

  <PeopleSelector name="people" />
  <PhotoUploader />

  <div class="text-small">
    {JSON.stringify(test)}
  </div>
</Form>
