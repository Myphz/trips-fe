<script lang="ts">
  import { del, deleteGroup } from "$lib/stores/api/delete";
  import { card } from "$lib/stores/api/select";
  import { closeModal } from "$lib/stores/modals";
  import { routeParams } from "$lib/stores/routeParams";
  import { getName } from "$utils/format";
  import { goBack } from "$utils/guard";
  import { get } from "svelte/store";
  import { Button } from "../form";

  const onDeleteClick = async () => {
    closeModal();
    const { entityId, parent, tripId } = routeParams;
    const isMainTrip = !get(parent) && !get(tripId);
    if (!(await del({ table: "entities", withErrorToast: !isMainTrip })) && isMainTrip) {
      // Don't delete someone else's main trip, leave it
      await deleteGroup(get(entityId));
    }

    goBack();
  };
</script>

<section class="flex flex-col text-center">
  <header class="text-h3">Delete {getName($card)}?</header>
  <div class="text-regular text-gray">This will delete all of its contents.</div>

  <div class="mt-4 flex w-full gap-2 [&>*]:flex [&>*]:flex-1 [&>*]:justify-center">
    <Button variant="outlined-primary" on:click={closeModal}>Cancel</Button>
    <Button variant="error" on:click={onDeleteClick}>Delete</Button>
  </div>
</section>
