<script lang="ts">
  import { card, getSingle } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import type { GetRowTypes } from "$lib/types/api";
  getSingle();

  function getName(card: GetRowTypes | null) {
    if (!card) return "";
    if (card.type === "trip") return card.destination;
    if (card.type === "lodging") return card.name;
    if (card.type === "place") return card.name;
    if (card.type === "transport") return "";
    return "";
  }

  $: setPageTitle(getName($card));
</script>

{#if $card}
  <div>we</div>
{/if}
