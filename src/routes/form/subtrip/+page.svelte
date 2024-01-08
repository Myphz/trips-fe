<script lang="ts">
  import { activateMode, setPageTitle } from "$lib/stores/route";
  import { Input, Form, MediaUploader, Datepicker } from "$lib/components/form";
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
  import { addEntity } from "$lib/stores/api/create";
  import { pexelSearch, updatePexelSearchOnInput } from "$lib/stores/pexels";
  import { onMount } from "svelte";
  import Move from "$lib/assets/icons/move.svg?raw";

  onMount(() => pexelSearch.set(""));

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;
  $: setPageTitle(isEdit ? `Edit ${getName($card)}` : "Add a group");

  $: defaultValues =
    isEdit && $card
      ? pick(rename($card as GetRowType<"trip">, { start: "start_date", end: "end_date" }), [
          "destination",
          "start_date",
          "end_date",
          "photo",
        ])
      : {};

  const onSubmit = async (data: Tables["entities"]["Insert"] & Tables["trips"]["Insert"]) => {
    if (data.start_date && data.end_date) {
      if (+new Date(data.start_date) > +new Date(data.end_date)) {
        return fail({ title: "Invalid data", msg: "Invalid dates. Please retry" });
      }
    }

    if (isEdit) {
      const { photo, ...rest } = data;
      await update({ table: "entities", params: { photo }, id: $entityId, withToast: false });
      await update({ table: "trips", params: emptyToNull(rest), id: $entityId });
    } else await addEntity("trips", data);

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

  <MediaUploader name="photo" mediaType="image" />
</Form>
