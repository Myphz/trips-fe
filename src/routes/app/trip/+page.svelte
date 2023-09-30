<script lang="ts">
  import { page } from "$app/stores";
  import Cards from "$lib/components/cards/Cards.svelte";
  import { card } from "$lib/stores/api/select";
  import { setPageTitle } from "$lib/stores/route";
  import { getName } from "$utils/format";

  $: $page.route.id === "/app/trip" && setPageTitle(getName($card));
</script>

<Cards />
