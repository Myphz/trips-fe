<script lang="ts">
  import "../app.css";
  import "../toast.css";

  import { Navbar, Header, Footer } from "$lib/components";
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  onMount(() => {
    import("../config");
  });
</script>

<Navbar />
<main class="mx-4 mb-12 pb-20">
  <Header />
  <slot />
</main>
<Footer />

<SvelteToast />
