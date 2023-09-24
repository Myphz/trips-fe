<script lang="ts">
  import { Cards } from "$lib/components";
  import { MAIN_PAGE_TITLE, setPageTitle } from "$lib/stores/route";
  setPageTitle(MAIN_PAGE_TITLE);
</script>

<Cards />
