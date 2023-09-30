<script lang="ts">
  import { getName } from "$utils/format";
  import { InformationCircle } from "svelte-heros";
  import { Redirect, Stars } from "../";
  import type { GetRowTypes } from "$lib/types/api";

  export let data: GetRowTypes;
</script>

{#if data}
  {@const redirectParams = { entityId: data.id, parent: data.id, tripId: data.tripId || data.id }}
  <article class="relative flex h-52 w-full text-white">
    <img
      class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover shadow-md"
      src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
      alt="test"
    />

    <div class="relative flex flex-1 flex-col">
      <Redirect href="/app/trip" params={redirectParams} classes="z-20 pb-4 pl-2 pr-4 pt-2 flex flex-1 flex-col">
        <header class="line-clamp-2 text-h3">{getName(data)}</header>
        <slot name="header" />
      </Redirect>

      <div class="absolute bottom-0 left-0 flex w-full items-center justify-between pb-4 pl-2 pr-4">
        <Stars rating={data.rating || 0} mode="rating" />

        <Redirect href="/app/info" classes="z-30" params={{ entityId: data.id }}>
          <InformationCircle size="2rem" />
        </Redirect>
      </div>
    </div>
  </article>
{/if}

<style>
  .darker-image {
    filter: brightness(50%);
  }
</style>
