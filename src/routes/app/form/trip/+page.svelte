<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form, Select, PhotoUploader, Datepicker, PeopleSelector } from "$lib/components/form";
  import type { AddTrip } from "$lib/types/forms";
  import { addTrip } from "$lib/stores/api/create";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  const onSubmit = async (data: AddTrip) => {
    // if (isEdit) return await updateTrip($entityId, data);
    await addTrip(data);
  };
</script>

<Form {onSubmit} buttonText="ADD">
  <Input placeholder="Destination" name="destination" required />
  <div class="flex gap-4">
    <Datepicker name="start_date" placeholder="Departure" />
    <Datepicker name="end_date" placeholder="Return" />
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
</Form>
