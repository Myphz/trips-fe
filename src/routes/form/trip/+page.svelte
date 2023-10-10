<script lang="ts">
  import { setPageTitle } from "$lib/stores/route";
  import {
    Input,
    Form,
    MediaUploader,
    Datepicker,
    PeopleSelector,
  } from "$lib/components/form";
  import { fail } from "$utils/toasts";
  import { routeParams } from "$lib/stores/routeParams";
  import { Trash } from "svelte-heros";
  import { toggleModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { emptyToNull, pick, rename } from "$utils/objects";
  import type { GetRowType, Tables } from "$lib/types/api";
  import { update } from "$lib/stores/api/update";
  import { addEntity, inviteUsers } from "$lib/stores/api/create";

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

  const onSubmit = async (
    data: Tables["entities"]["Insert"] & Tables["trips"]["Insert"] & { people: string[] },
  ) => {
    const { people, ...restData } = data;

    if (restData.start_date && restData.end_date) {
      if (+new Date(restData.start_date) > +new Date(restData.end_date)) {
        return fail({ title: "Invalid dates", msg: "Invalid dates. Please retry" });
      }
    }

    let tripId = $entityId;
    if (isEdit) {
      const { photo, ...rest } = restData;
      await update({ table: "entities", params: { photo }, id: $entityId, withToast: false });
      await update({ table: "trips", params: emptyToNull(rest), id: $entityId });
    } else tripId = (await addEntity("trips", restData)).id;

    await inviteUsers(people, tripId);
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

<Form {onSubmit} {isEdit} buttonText={isEdit ? "UPDATE" : "ADD"} {defaultValues}>
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
  /> -->

  <PeopleSelector name="people" />
  <MediaUploader name="photo" mediaType="image" />
</Form>
