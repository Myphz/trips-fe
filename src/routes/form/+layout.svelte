<script lang="ts">
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";

  onMount(async () => {
    authGuard();
  });
</script>

<slot />
