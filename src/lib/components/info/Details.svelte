<script lang="ts">
  import { tripCurrency } from "$lib/stores/route";
  import { differenceBetweenDates } from "$utils/format";

  export let data: Record<string, string | number>;
  export let header: string;
  export let withCurrency = false;

  $: entries = Object.entries(data);
  $: {
    const [start, end] = [
      data.Departure || data["Check-in"],
      data.Return || data["Check-out"],
    ];
    const [startTime, endTime] = [data.departure, data.arrival];

    if (start && end) {
      // Automatically calculate duration in days
      const delta = +new Date(end) - +new Date(start);
      const daysDelta = Math.floor(delta / (1000 * 60 * 60 * 24));
      entries = [...(entries || []), ["Duration", `${daysDelta} days`]];
    }

    if (startTime && endTime) {
      entries = [...(entries || []), ["Duration", differenceBetweenDates(startTime, endTime)]];
    }
  }
</script>

{#if entries?.length}
  <section>
    <header class="capitalize-first text-h3">{header}</header>
    <div class="mt-4 flex flex-col gap-1">
      {#each entries as [key, value]}
        <div class="flex justify-between gap-24">
          <span class="capitalize-first">{key}</span>
          <span class="capitalize-first text-right">
            {value}
            {withCurrency || key === "price" ? $tripCurrency : ""}
          </span>
        </div>
      {/each}
    </div>
  </section>
{/if}
