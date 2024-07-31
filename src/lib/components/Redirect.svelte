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
    if (href === "/")
      return setRouteParams(
        { entityId: 0, parent: 0, tripId: 0, currency: "", currencyRatio: 0 },
        { saveParams: false },
      );

    setRouteParams(params, { paramsRedirect });
  }}
>
  <slot />
</a>
