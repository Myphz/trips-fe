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
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { emptyToNull, pick, rename } from "$utils/objects";
  import type { GetRowType, Tables } from "$lib/types/api";
  import { update } from "$lib/stores/api/update";
  import { addEntity, inviteUsers } from "$lib/stores/api/create";
  import Combobox from "$lib/components/form/Combobox.svelte";
  import currencies from "$lib/assets/currencies.json";
  import { pexelSearch, updatePexelSearchOnInput } from "$lib/stores/pexels";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { deletePhoto } from "$lib/stores/api/delete";

  const { entityId } = routeParams;

  onMount(() => pexelSearch.set(""));

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a trip");

  $: defaultValues = writable(
    isEdit && $card
      ? pick(
          rename($card as GetRowType<"trip">, {
            start: "start_date",
            end: "end_date",
            currencyRatio: "currency_ratio",
          }),
          ["destination", "start_date", "end_date", "thumbnail", "currency", "currency_ratio"],
        )
      : {},
  );

  const onSubmit = async (
    data: Tables["entities"]["Insert"] & Tables["trips"]["Insert"] & { people: string[] },
  ) => {
    const { people = [], ...restData } = data;

    if (restData.start_date && restData.end_date) {
      if (+new Date(restData.start_date) > +new Date(restData.end_date)) {
        return fail({ title: "Invalid dates", msg: "Invalid dates. Please retry" });
      }
    }

    let tripId = $entityId;
    if (isEdit) {
      const { thumbnail, ...rest } = restData;
      if (!thumbnail && $card?.thumbnail) await deletePhoto($card.thumbnail);

      await update({
        table: "entities",
        params: emptyToNull({ thumbnail }),
        id: $entityId,
        withToast: false,
      });
      await update({ table: "trips", params: emptyToNull(rest), id: $entityId });
    } else tripId = (await addEntity("trips", restData)).id;

    await inviteUsers(people, tripId);

    goBack();
  };
</script>

<Form {onSubmit} {isEdit} buttonText={isEdit ? "UPDATE" : "ADD"} {defaultValues}>
  <Input
    placeholder="Destination"
    name="destination"
    required
    on:input={updatePexelSearchOnInput}
  />
  <div class="flex gap-4">
    <Datepicker name="start_date" placeholder="Departure" />
    <Datepicker name="end_date" placeholder="Return" />
  </div>

  <div class="flex gap-4">
    <Combobox name="currency" label="Currency" options={currencies} />
    <Input placeholder="EUR Ratio" name="currency_ratio" />
  </div>

  <PeopleSelector name="people" />
  <MediaUploader name="thumbnail" mediaType="image" />
</Form>
