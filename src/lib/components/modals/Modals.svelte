<script lang="ts">
  import { modalOpen, modalState } from "$lib/stores/modals";
  import DeleteEntity from "./DeleteEntity.svelte";
  import Modal from "./Modal.svelte";

  const { deleteEntity } = modalState;
</script>

{#if $modalOpen}
  <Modal>
    {#if $deleteEntity}
      <DeleteEntity />
    {/if}
  </Modal>
{/if}
