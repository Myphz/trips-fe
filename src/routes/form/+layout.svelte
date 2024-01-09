<script lang="ts">
  import { toggleModal } from "$lib/stores/modals";
  import { activateMode } from "$lib/stores/route";
  import { routeParams } from "$lib/stores/routeParams";
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";
  import { Trash } from "svelte-heros";
  import Move from "$lib/assets/icons/move.svg?raw";

  const { entityId } = routeParams;

  $: isEdit = !!$entityId;

  onMount(async () => {
    authGuard();
  });
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

<slot />
