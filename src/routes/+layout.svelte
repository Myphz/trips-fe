<script lang="ts">
  import "../app.css";
  import "../toast.css";

  import { Navbar, Header } from "$lib/components";
  import { onMount } from "svelte";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { keyboardOpen } from "$lib/stores/ui";
  import { Modals } from "$lib/components/modals";

  onMount(() => {
    import("../config");
    if (!("visualViewport" in window && window.visualViewport)) return;

    const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;

    window.visualViewport.addEventListener("resize", function (event: any) {
      const isOpen =
        (event.target.height * event.target.scale) / window.screen.height <
        VIEWPORT_VS_CLIENT_HEIGHT_RATIO;
      keyboardOpen.set(isOpen);
    });
  });
</script>

<Navbar />
<section class="relative mx-4 h-full pb-20">
  <Header />
  <slot />
</section>

<SvelteToast options={{ intro: { y: -100 }, duration: 4000 }} />
<Modals />
