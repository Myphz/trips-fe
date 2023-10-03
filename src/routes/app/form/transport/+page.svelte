<script lang="ts">
  import { setPageTitle } from "$lib/stores/route";
  import { Input, Form, MediaUploader, Datepicker, Select } from "$lib/components/form";
  import { routeParams } from "$lib/stores/routeParams";
  import { Trash } from "svelte-heros";
  import { toggleModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { pickCard } from "$utils/objects";
  import { update } from "$lib/stores/api/update";
  import { addEntity } from "$lib/stores/api/create";
  import type { FormParams } from "$lib/types/forms";
  import { MEANS_OF_TRANSPORT } from "../../../../constants";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a transport");

  $: defaultValues =
    isEdit && $card ? pickCard("transport", ["departure", "arrival", "price"]) : {};

  const onSubmit = async (data: FormParams<"transports">) => {
    if (isEdit) {
      const { photo, ...rest } = data;
      await update({ table: "entities", params: { photo }, id: $entityId, withToast: false });
      await update({ table: "transports", params: rest, id: $entityId });
    } else await addEntity("transports", data);

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
  <Input placeholder="Depart from" name="departure_place" required />
  <Input placeholder="Arrive to" name="arrival_place" required />

  <div class="flex gap-4">
    <Datepicker name="departure_datetime" mode="dateAndTime" placeholder="Depart at" />
    <Datepicker name="arrival_datetime" mode="dateAndTime" placeholder="Arrive at" />
  </div>

  <Input placeholder="Price" name="price" />
  <Select name="mean" label="Mean of transport" options={MEANS_OF_TRANSPORT} />

  <MediaUploader name="photo" mediaType="image" />
</Form>
