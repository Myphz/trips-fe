<script lang="ts">
  import { routeParams, setPageTitle } from "$lib/stores/route";
  import { Input, Form, Select, PhotoUploader, Datepicker, PeopleSelector } from "$lib/components/form";
  import { authGuard } from "../../../utils/guard";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  setPageTitle(isEdit ? "Edit a trip" : "Add a trip");

  const onSubmit = (data: { id: string }) => {
    console.log(data);
  };

  authGuard();
</script>

<Form {onSubmit} buttonText="ADD">
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
</Form>
