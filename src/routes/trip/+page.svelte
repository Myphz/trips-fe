<script lang="ts">
  import Cards from "$lib/components/cards/Cards.svelte";
  import MoveModal from "$lib/components/cards/MoveModal.svelte";
  import { card } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import { moveEntity } from "$lib/stores/routeParams";
  import { getName } from "$utils/format";

  $: setPageTitle(getName($card));
</script>

<Cards />

{#if $moveEntity}
  <MoveModal />
{/if}
