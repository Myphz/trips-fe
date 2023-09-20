<script lang="ts">
  import { Navbar, Header } from "$lib/components";
  import { onMount } from "svelte";
  import "../app.css";

  onMount(() => {
    import("../config");
  });
</script>

<Navbar />
<main class="mx-4">
  <Header />
  <slot />
</main>
