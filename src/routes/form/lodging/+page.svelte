<script lang="ts">
  import { setPageTitle } from "$lib/stores/route";
  import { Input, Form, MediaUploader, Datepicker, MapsCombobox } from "$lib/components/form";
  import { fail } from "$utils/toasts";
  import { routeParams } from "$lib/stores/routeParams";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { emptyToNull, pick, rename } from "$utils/objects";
  import type { GetRowType } from "$lib/types/api";
  import { update } from "$lib/stores/api/update";
  import { addEntity } from "$lib/stores/api/create";
  import type { FormParams } from "$lib/types/forms";
  import { pexelSearch, updatePexelSearchOnInput } from "$lib/stores/pexels";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  onMount(() => pexelSearch.set(""));

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a lodging");

  $: defaultValues = writable(
    isEdit && $card
      ? pick(
          rename($card as GetRowType<"lodging">, { start: "start_date", end: "end_date" }),
          ["name", "start_date", "end_date", "photo", "price", "address"],
        )
      : {},
  );

  const onSubmit = async (data: FormParams<"lodgings">) => {
    if (data.start_date && data.end_date) {
      if (+new Date(data.start_date) > +new Date(data.end_date)) {
        return fail({ title: "Invalid data", msg: "Invalid dates. Please retry" });
      }
    }

    if (data.price) {
      data.price = parseFloat(data.price as unknown as string);
      if (isNaN(data.price))
        return fail({ title: "Invalid price", msg: "Invalid value for price. Please retry." });
    } else {
      delete data.price;
    }

    if (isEdit) {
      const { photo, maps_id, ...rest } = data;
      await update({
        table: "entities",
        params: { photo, maps_id },
        id: $entityId,
        withToast: false,
      });
      await update({ table: "lodgings", params: emptyToNull(rest), id: $entityId });
    } else await addEntity("lodgings", data);

    goBack();
  };
</script>

<Form {onSubmit} {isEdit} buttonText={isEdit ? "UPDATE" : "ADD"} {defaultValues}>
  <Input placeholder="Name" name="name" required on:input={updatePexelSearchOnInput} />

  <div class="flex gap-4">
    <Datepicker name="start_date" placeholder="Start date" />
    <Datepicker name="end_date" placeholder="End date" />
  </div>
  <MapsCombobox
    label="Address"
    name="address"
    onSelect={(option) => {
      const main = option.split(",")[0];
      $defaultValues = { ...$defaultValues, name: main };
    }}
  />
  <Input placeholder="Total price" name="price" numeric />

  <MediaUploader name="photo" mediaType="image" />
</Form>
