<script lang="ts">
  import { Navbar } from "$lib/components";
  import "../app.css";
</script>

<Navbar />
<main class="mx-4">
  <slot />
</main>
