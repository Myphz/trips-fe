<script lang="ts">
  import { Menu } from "$lib/components";
  import { authGuard } from "$utils/guard";
  import { navigating } from "$app/stores";

  authGuard();
  $: if ($navigating) {
  }
</script>

<Menu />
<div class="h-full w-full">
  <slot />
</div>
