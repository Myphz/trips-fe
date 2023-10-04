<script lang="ts">
  import { Cards } from "$lib/components";
  import { filter } from "$lib/stores/api/select";
  import { MAIN_PAGE_TITLE, setPageTitle } from "$lib/stores/route";
  import { onMount } from "svelte";

  onMount(() => {
    setPageTitle(MAIN_PAGE_TITLE);
    filter.set(null);
  });
</script>

<Cards />
