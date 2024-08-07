<script lang="ts">
  import { setPageTitle } from "$lib/stores/route";
  import { Input, Form, MediaUploader, Datepicker } from "$lib/components/form";
  import { fail } from "$utils/toasts";
  import { routeParams } from "$lib/stores/routeParams";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { emptyToNull, pick, rename } from "$utils/objects";
  import type { GetRowType, Tables } from "$lib/types/api";
  import { update } from "$lib/stores/api/update";
  import { addEntity } from "$lib/stores/api/create";
  import { pexelSearch, updatePexelSearchOnInput } from "$lib/stores/pexels";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { deletePhoto } from "$lib/stores/api/delete";

  onMount(() => pexelSearch.set(""));

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a group");

  $: defaultValues = writable(
    isEdit && $card
      ? pick(rename($card as GetRowType<"trip">, { start: "start_date", end: "end_date" }), [
          "destination",
          "start_date",
          "end_date",
          "thumbnail",
        ])
      : {},
  );

  const onSubmit = async (data: Tables["entities"]["Insert"] & Tables["trips"]["Insert"]) => {
    if (data.start_date && data.end_date) {
      if (+new Date(data.start_date) > +new Date(data.end_date)) {
        return fail({ title: "Invalid data", msg: "Invalid dates. Please retry" });
      }
    }

    if (isEdit) {
      const { thumbnail, ...rest } = data;
      if (!thumbnail && $card?.thumbnail) await deletePhoto($card.thumbnail);

      await update({
        table: "entities",
        params: emptyToNull({ thumbnail }),
        id: $entityId,
        withToast: false,
      });
      await update({ table: "trips", params: emptyToNull(rest), id: $entityId });
    } else await addEntity("trips", data);

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

  <MediaUploader name="thumbnail" mediaType="image" />
</Form>
