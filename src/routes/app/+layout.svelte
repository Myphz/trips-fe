<script lang="ts">
  import { Menu } from "$lib/components";
  import { authGuard } from "$utils/guard";

  authGuard();
</script>

<Menu />
<div class="h-full w-full">
  <slot />
</div>
