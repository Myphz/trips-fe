<script lang="ts">
  import { Cards } from "$lib/components";
  import { filter } from "$lib/stores/api/select";
  import { MAIN_PAGE_TITLE, setPageTitle } from "$lib/stores/route";
  import { deleteAppState } from "$utils/app";
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";

  onMount(() => {
    authGuard();
    deleteAppState();
    setPageTitle(MAIN_PAGE_TITLE);
    filter.set(null);
  });
</script>

<Cards />
