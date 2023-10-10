<script lang="ts">
  import { setRouteParams, type RoutesUnwrapped } from "$lib/stores/route";

  export let href: string;
  export let classes = "";
  export let params: Partial<RoutesUnwrapped>;
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
