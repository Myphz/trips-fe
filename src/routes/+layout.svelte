<script lang="ts">
  import "../app.css";
  import "../toast.css";

  import { Navbar, Header, Footer } from "$lib/components";
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { keyboardOpen } from "$lib/stores/ui";

  onMount(() => {
    import("../config");
    if (!("visualViewport" in window && window.visualViewport)) return;

    const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;

    window.visualViewport.addEventListener("resize", function (event: any) {
      const isOpen =
        (event.target.height * event.target.scale) / window.screen.height < VIEWPORT_VS_CLIENT_HEIGHT_RATIO;
      keyboardOpen.set(isOpen);
    });
  });
</script>

<Navbar />
<main class="mx-4 mb-12 pb-20">
  <Header />
  <slot />
</main>
<Footer />

<SvelteToast options={{ intro: { y: -100 } }} />
