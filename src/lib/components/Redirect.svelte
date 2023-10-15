<script lang="ts">
  import { setRouteParams } from "$lib/stores/route";

  export let href: string;
  export let classes = "";
  export let params: Parameters<typeof setRouteParams>[0];
  export let paramsRedirect = true;
</script>

<a
  {href}
  class={classes}
  on:click={() => {
    setRouteParams(params, { paramsRedirect });
  }}
>
  <slot />
</a>
