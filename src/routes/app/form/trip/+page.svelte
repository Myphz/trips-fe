<script lang="ts">
  import { setPageTitle } from "$lib/stores/route";
  import {
    Input,
    Form,
    Select,
    PhotoUploader,
    Datepicker,
    PeopleSelector,
  } from "$lib/components/form";
  import type { AddTrip } from "$lib/types/forms";
  import { addTrip } from "$lib/stores/api/create";
  import { fail } from "$utils/toasts";
  import { routeParams } from "$lib/stores/routeParams";
  import { Trash } from "svelte-heros";
  import { toggleModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { pick, rename } from "$utils/objects";
  import type { GetRowType } from "$lib/types/api";
  import { update } from "$lib/stores/api/update";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a trip");

  $: defaultValues =
    isEdit && $card
      ? pick(rename($card as GetRowType<"trip">, { start: "start_date", end: "end_date" }), [
          "destination",
          "start_date",
          "end_date",
          "photo",
        ])
      : {};

  const onSubmit = async (data: AddTrip) => {
    if (data.start_date && data.end_date) {
      if (+new Date(data.start_date) > +new Date(data.end_date)) {
        return fail({ title: "Invalid data", msg: "Invalid dates. Please retry" });
      }
    }

    if (isEdit) {
      const { photo, ...rest } = data;
      await update({ table: "entities", params: { photo }, id: $entityId, withToast: false });
      await update({ table: "trips", params: rest, id: $entityId });
    } else await addTrip(data);

    goBack();
  };
</script>

{#if isEdit}
  <button
    class="absolute right-0 top-0 flex h-12 items-center justify-center text-error"
    on:click={() => toggleModal("deleteEntity")}
  >
    <Trash size="1.5rem" />
  </button>
{/if}

<Form {onSubmit} buttonText={isEdit ? "UPDATE" : "ADD"} {defaultValues}>
  <Input placeholder="Destination" name="destination" required />
  <div class="flex gap-4">
    <Datepicker name="start_date" placeholder="Departure" />
    <Datepicker name="end_date" placeholder="Return" />
  </div>
  <!-- <Select
    name="currency"
    label="Currency"
    options={[
      { label: "Daniel", value: "2" },
      { label: "b", value: "3" },
    ]}
  />

  <PeopleSelector name="people" /> -->
  <PhotoUploader name="photo" />
</Form>
