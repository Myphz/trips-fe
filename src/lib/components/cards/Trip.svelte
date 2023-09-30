<script lang="ts">
  import type { EntityCommon, GetRowType } from "$lib/types/api";
  import { dateToCard } from "$utils/format";
  import { Stars, Redirect } from "../";
  import { InformationCircle } from "svelte-heros";
  import CardBase from "./CardBase.svelte";

  export let data: EntityCommon & GetRowType<"trip">;
  const { destination, id, tripId, photo, rating, start, end } = data;
  const redirectParams = { entityId: id, parent: id, tripId: tripId || id };
</script>

<CardBase>
  <img
    class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover shadow-md"
    src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
    alt="test"
  />

  <div class="relative flex flex-1 flex-col">
    <Redirect href="/app/trip" params={redirectParams} classes="z-20 pb-4 pl-2 pr-4 pt-2 flex flex-1 flex-col">
      <header class="text-h3">{destination}</header>
      {#if start && end}
        <div class="flex gap-1 text-xs">
          <div class="text-xs">{dateToCard(start)}</div>
          <span>-</span>
          <div class="text-xs">{dateToCard(end)}</div>
        </div>
      {/if}
    </Redirect>

    <div class="absolute bottom-0 left-0 flex w-full items-center justify-between pb-4 pl-2 pr-4">
      <Stars rating={rating || 0} mode="rating" />

      <Redirect href="/app/info" classes="z-30" params={{ entityId: id }}>
        <InformationCircle size="2rem" />
      </Redirect>
    </div>
  </div>
</CardBase>

<style>
  .darker-image {
    filter: brightness(50%);
  }
</style>
