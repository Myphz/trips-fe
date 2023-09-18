<script lang="ts">
  import { setRouteParams, type RoutesUnwrapped } from "$lib/stores/route";

  export let href: string;
  export let classes = "";
  export let params: Partial<RoutesUnwrapped>;
</script>

<a
  {href}
  class={classes}
  on:click={() => {
    setRouteParams(params);
  }}
>
  <slot />
</a>
