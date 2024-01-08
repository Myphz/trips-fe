<script lang="ts">
  import { activateMode, setPageTitle } from "$lib/stores/route";
  import { Input, Form, MediaUploader, Datepicker, Select } from "$lib/components/form";
  import { routeParams } from "$lib/stores/routeParams";
  import { Trash } from "svelte-heros";
  import { toggleModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { emptyToNull, pick, rename } from "$utils/objects";
  import { update } from "$lib/stores/api/update";
  import { addEntity } from "$lib/stores/api/create";
  import type { FormParams } from "$lib/types/forms";
  import type { GetRowType } from "$lib/types/api";
  import { fail } from "$utils/toasts";
  import { MEANS_OF_TRANSPORT } from "../../../constants";
  import { pexelSearch } from "$lib/stores/pexels";
  import { onMount } from "svelte";
  import Move from "$lib/assets/icons/move.svg?raw";

  const { entityId } = routeParams;

  onMount(() => pexelSearch.set(""));

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a transport");

  $: defaultValues =
    isEdit && $card
      ? pick(
          rename($card as GetRowType<"transport">, {
            departurePlace: "departure_place",
            arrivalPlace: "arrival_place",
            departure: "departure_datetime",
            arrival: "arrival_datetime",
          }),
          [
            "departure_place",
            "arrival_place",
            "departure_datetime",
            "arrival_datetime",
            "mean",
            "photo",
            "price",
          ],
        )
      : {};

  const onSubmit = async (data: FormParams<"transports">) => {
    if (data.price) {
      data.price = parseFloat(data.price as unknown as string);
      if (isNaN(data.price))
        return fail({ title: "Invalid price", msg: "Invalid value for price. Please retry." });
    } else {
      delete data.price;
    }

    if (isEdit) {
      const { photo, ...rest } = data;
      await update({ table: "entities", params: { photo }, id: $entityId, withToast: false });
      await update({ table: "transports", params: emptyToNull(rest), id: $entityId });
    } else await addEntity("transports", data);

    goBack();
  };
</script>

{#if isEdit}
  <div class="absolute right-0 top-0 flex justify-end gap-4">
    <button on:click={activateMode} class="ml-auto text-primary">
      {@html Move}
    </button>
    <button class="h-12 text-error" on:click={() => toggleModal("deleteEntity")}>
      <Trash size="1.5rem" variation="solid" />
    </button>
  </div>
{/if}

<Form {onSubmit} {isEdit} buttonText={isEdit ? "UPDATE" : "ADD"} {defaultValues}>
  <Input placeholder="Depart from" name="departure_place" required />
  <Input placeholder="Arrive to" name="arrival_place" required />

  <div class="flex gap-4">
    <Datepicker name="departure_datetime" mode="dateAndTime" placeholder="Depart at" />
    <Datepicker name="arrival_datetime" mode="dateAndTime" placeholder="Arrive at" />
  </div>

  <Input placeholder="Price" name="price" numeric />
  <Select name="mean" label="Mean of transport" options={MEANS_OF_TRANSPORT} />

  <MediaUploader name="photo" mediaType="image" />
</Form>
