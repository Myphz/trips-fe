<script lang="ts">
  import { dateToCard } from "$utils/format";
  import { Stars } from ".";
  import { InformationCircle } from "svelte-heros";

  export let destination: string;
  export let startDate: string | null = null;
  export let endDate: string | null = null;
</script>

<a href="/app/trip">
  <article class="relative flex h-52 w-full rounded-xl text-white">
    <img
      class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover"
      src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
      alt="test"
    />

    <div class="flex flex-1 flex-col pb-4 pl-2 pr-4 pt-2">
      <div class="flex flex-1 flex-col">
        <header class="text-h3">{destination}</header>
        {#if startDate && endDate}
          <div class="flex gap-1 text-xs">
            <div class="text-xs">{dateToCard(startDate)}</div>
            <span>-</span>
            <div class="text-xs">{dateToCard(endDate)}</div>
          </div>
        {/if}
      </div>
      <div class="flex items-center justify-between">
        <Stars number={5} />
        <InformationCircle size="1.5rem" />
      </div>
    </div>
  </article>

  <style>
    .darker-image {
      filter: brightness(50%);
    }
  </style>
</a>
