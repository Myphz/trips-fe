<script lang="ts">
  import { tripCurrency, tripCurrencyRatio } from "$lib/stores/route";
  import { differenceBetweenDates, formatPrice } from "$utils/format";

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

    let daysDelta = 0;

    if (start && end) {
      // Automatically calculate duration in days
      const delta = +new Date(end) - +new Date(start);
      daysDelta = Math.floor(delta / (1000 * 60 * 60 * 24));
      entries = [...(entries || []), ["Duration", `${daysDelta} days`]];
    }

    if (data["Check-in"] && data["Check-out"] && daysDelta && data.price) {
      // Automatically calculate price per night for lodgings
      entries = [...(entries || []), ["price per night", (data.price as number) / daysDelta]];
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
        {@const isPrice = withCurrency || key.includes("price")}
        <div class="flex justify-between gap-24">
          <span class="capitalize-first">{key}</span>
          <span class="capitalize-first text-right">
            {isPrice ? formatPrice(value) : value}
            {#if isPrice}
              {$tripCurrency}
              {#if $tripCurrencyRatio}
                ({formatPrice(
                  (typeof value === "string" ? parseFloat(value) : value) * $tripCurrencyRatio,
                )} €)
              {/if}
            {/if}
          </span>
        </div>
      {/each}
    </div>
  </section>
{/if}
