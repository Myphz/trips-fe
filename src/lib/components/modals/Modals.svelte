<script lang="ts">
  import { modalOpen, modalState } from "$lib/stores/modals";
  import DeleteEntity from "./DeleteEntity.svelte";
  import DeleteAccount from "./DeleteAccount.svelte";
  import PhotoInfo from "./PhotoInfo.svelte";
  import DeletePhoto from "./DeletePhoto.svelte";

  import Modal from "./Modal.svelte";

  const { deleteEntity, deleteAccount, photoInfo, deletePhoto } = modalState;
</script>

{#if $modalOpen}
  <Modal>
    {#if $deleteEntity}
      <DeleteEntity />
    {/if}

    {#if $deleteAccount}
      <DeleteAccount />
    {/if}

    {#if $photoInfo}
      <PhotoInfo />
    {/if}

    {#if $deletePhoto}
      <DeletePhoto />
    {/if}
  </Modal>
{/if}
