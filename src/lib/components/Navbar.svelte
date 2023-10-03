<script lang="ts">
  import Logo from "$lib/assets/brand/logo-outline.svg?raw";
  import { UserCircle } from "svelte-heros";
</script>

<header
  class="sticky top-0 z-50 mb-12 flex items-center justify-between bg-gradient px-4 pt-6 text-white"
>
  <div class="flex aspect-square w-16 items-center justify-center">
    {@html Logo}
  </div>

  <a href="/"><UserCircle size="2rem" /></a>
</header>
