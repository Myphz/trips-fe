<script lang="ts">
  import type { EntityCommon, GetRowType } from "$lib/types/api";
  import { dateToCard } from "$utils/format";
  import { Stars, Redirect } from "../";
  import { InformationCircle } from "svelte-heros";

  export let data: EntityCommon & GetRowType<"trip">;
  const { destination, id, tripId, photo, rating, start, end } = data;
  const redirectParams = { entityId: id, parent: id, tripId: tripId || id };
</script>

<Redirect href="/app/trip" params={redirectParams}>
  <article class="relative flex h-52 w-full text-white">
    <img
      class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover"
      src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
      alt="test"
    />

    <div class="flex flex-1 flex-col pb-4 pl-2 pr-4 pt-2">
      <div class="flex flex-1 flex-col">
        <header class="text-h3">{destination}</header>
        {#if start && end}
          <div class="flex gap-1 text-xs">
            <div class="text-xs">{dateToCard(start)}</div>
            <span>-</span>
            <div class="text-xs">{dateToCard(end)}</div>
          </div>
        {/if}
      </div>
      <div class="flex items-center justify-between">
        <Stars number={rating} />
        <Redirect href="/app/info" params={redirectParams}>
          <InformationCircle size="2rem" />
        </Redirect>
      </div>
    </div>
  </article>

  <style>
    .darker-image {
      filter: brightness(50%);
    }
  </style>
</Redirect>
