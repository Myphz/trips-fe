<script lang="ts">
  import { Footer } from "$lib/components";
  import { authGuard } from "$utils/guard";
  import { onMount } from "svelte";

  onMount(() => authGuard());
</script>

<slot />
<Footer />
