<script lang="ts">
  import type { EntityCommon, GetRowType } from "$lib/types/api";
  import { dateToCard } from "$utils/format";
  import { Stars, Redirect } from "../";

  export let data: EntityCommon & GetRowType<"transport">;
  const { id, tripId, rating, parent, mean } = data;
</script>

<Redirect href="/app/trip" params={{ entityId: id, tripId: tripId, parent }}>
  <article class="relative flex h-52 w-full rounded-xl text-white">
    <img
      class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover"
      src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
      alt="test"
    />

    <div class="flex flex-1 flex-col pb-4 pl-2 pr-4 pt-2">
      <!-- <div class="flex flex-1 flex-col">
        <header class="text-h3">{name}</header>
        {#if date}
          <div class="text-xs">{dateToCard(date)}</div>
        {/if}
      </div>
      <div class="flex items-center justify-between">
        <Stars number={rating} />
      </div>
    </div> -->
      todo
    </div>
  </article>

  <style>
    .darker-image {
      filter: brightness(50%);
    }
  </style>
</Redirect>
