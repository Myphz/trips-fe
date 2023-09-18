<script lang="ts">
  import { Navbar, Header, Textarea } from "$lib/components";
  import "../app.css";
</script>

<Navbar />
<main class="mx-4">
  <Header />
  <slot />
</main>
