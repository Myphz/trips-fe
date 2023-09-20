<script lang="ts">
  import { Navbar, Header } from "$lib/components";
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  import "../app.css";
  import "../toast.css";
  import { success } from "../utils/toasts";

  onMount(() => {
    import("../config");
  });
</script>

<Navbar />
<main class="mx-4 mb-12">
  <Header />
  <slot />
</main>

<SvelteToast />
