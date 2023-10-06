<script lang="ts">
  import { modalOpen, modalState } from "$lib/stores/modals";
  import DeleteEntity from "./DeleteEntity.svelte";
  import DeleteAccount from "./DeleteAccount.svelte";

  import Modal from "./Modal.svelte";

  const { deleteEntity, deleteAccount } = modalState;
</script>

{#if $modalOpen}
  <Modal>
    {#if $deleteEntity}
      <DeleteEntity />
    {/if}

    {#if $deleteAccount}
      <DeleteAccount />
    {/if}
  </Modal>
{/if}
