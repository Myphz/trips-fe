<script lang="ts">
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";

  onMount(() => {
    authGuard(false);
  });
</script>

<slot />
