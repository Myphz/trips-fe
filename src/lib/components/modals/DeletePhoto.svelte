<script lang="ts">
  import { deletePhoto } from "$lib/stores/api/delete";
  import { loadPhotos } from "$lib/stores/api/select";
  import { closeModal } from "$lib/stores/modals";
  import { goBack } from "$utils/guard";
  import { Button } from "../form";

  const onDeleteClick = async () => {
    closeModal();

    await deletePhoto();
    loadPhotos();

    goBack();
  };
</script>

<section class="flex flex-col text-center">
  <header class="text-h3">Delete photo?</header>

  <div class="mt-4 flex w-full gap-2 [&>*]:flex [&>*]:flex-1 [&>*]:justify-center">
    <Button variant="outlined-primary" on:click={closeModal}>Cancel</Button>
    <Button variant="error" on:click={onDeleteClick}>Delete</Button>
  </div>
</section>
