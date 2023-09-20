<script lang="ts">
  import { authGuard } from "$utils/guard";

  authGuard();
</script>

<slot />
