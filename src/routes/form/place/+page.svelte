<script lang="ts">
  import { setPageTitle } from "$lib/stores/route";
  import { Input, Form, MediaUploader, Datepicker, MapsCombobox } from "$lib/components/form";
  import { routeParams } from "$lib/stores/routeParams";
  import { Trash } from "svelte-heros";
  import { toggleModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { card } from "$lib/stores/api/select";
  import { getName } from "$utils/format";
  import { emptyToNull, pickCard } from "$utils/objects";
  import { update } from "$lib/stores/api/update";
  import { addEntity } from "$lib/stores/api/create";
  import type { FormParams } from "$lib/types/forms";
  import { fail } from "$utils/toasts";
  import { pexelSearch, updatePexelSearchOnInput } from "$lib/stores/pexels";
  import { onMount } from "svelte";

  onMount(() => pexelSearch.set(""));

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add an activity");

  $: defaultValues =
    isEdit && $card ? pickCard("place", ["name", "address", "date", "price", "photo"]) : {};

  const onSubmit = async (data: FormParams<"places">) => {
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
      await update({ table: "places", params: emptyToNull(rest), id: $entityId });
    } else await addEntity("places", data);

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
  <Input placeholder="Name" name="name" required on:input={updatePexelSearchOnInput} />
  <MapsCombobox label="Address" name="address" />
  <div class="flex gap-4">
    <Datepicker name="date" placeholder="Date" />
    <Input placeholder="Price" name="price" numeric />
  </div>
  <MediaUploader name="photo" mediaType="image" />
</Form>
