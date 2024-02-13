<script lang="ts">
  import { modalOpen, modalState } from "$lib/stores/modals";
  import DeleteEntity from "./DeleteEntity.svelte";
  import DeleteAccount from "./DeleteAccount.svelte";
  import PhotoInfo from "./PhotoInfo.svelte";

  import Modal from "./Modal.svelte";

  const { deleteEntity, deleteAccount, photoInfo } = modalState;
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
  </Modal>
{/if}
