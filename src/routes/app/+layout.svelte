<script lang="ts">
  import { Menu } from "$lib/components";
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";

  onMount(async () => {
    authGuard();
  });
</script>

<Menu />
<slot />
