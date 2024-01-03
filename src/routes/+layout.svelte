<script lang="ts">
  import { Menu } from "$lib/components";
  import { onMount } from "svelte";

  import "../app.css";
  import "../toast.css";

  import { Navbar, Header } from "$lib/components";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { keyboardOpen } from "$lib/stores/ui";
  import { Modals } from "$lib/components/modals";
  import { appConfig } from "../config";
  import { saveStateToLocalStorage } from "$utils/app";
  import { afterNavigate } from "$app/navigation";
  import { setupErrorHandlers } from "$utils/error";

  onMount(() => {
    appConfig();
    if (!("visualViewport" in window && window.visualViewport)) return;

    const VIEWPORT_VS_CLIENT_HEIGHT_RATIO = 0.75;

    window.visualViewport.addEventListener("resize", function (event: any) {
      const isOpen =
        (event.target.height * event.target.scale) / window.screen.height <
        VIEWPORT_VS_CLIENT_HEIGHT_RATIO;
      keyboardOpen.set(isOpen);
    });
    setupErrorHandlers();
  });

  afterNavigate(saveStateToLocalStorage);
</script>

<Navbar />
<section class="relative mx-4 h-full pb-20">
  <Header />
  <Menu />
  <slot />
</section>

<SvelteToast options={{ intro: { y: -100 }, duration: 4000 }} />
<Modals />
