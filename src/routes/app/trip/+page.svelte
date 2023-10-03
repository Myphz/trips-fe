<script lang="ts">
  import Cards from "$lib/components/cards/Cards.svelte";
  import { card } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import { getName } from "$utils/format";

  $: setPageTitle(getName($card));
</script>

<Cards />
