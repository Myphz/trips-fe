<script lang="ts">
  import { tripCurrency } from "$lib/stores/route";
  import { differenceInHours } from "date-fns";

  export let data: Record<string, string | number>;
  export let header: string;

  const entries = Object.entries(data);
  const [start, end] = [data.Departure || data["Check-in"], data.Return || data["Check-out"]];
  const [startTime, endTime] = [data.departure, data.arrival];

  function addCurrency(key: string) {
    const idx = entries.findIndex(([k, _]) => k === key);
    if (idx !== -1) {
      entries[idx] = [key, `${entries[idx][1]} ${$tripCurrency}`];
    }
  }

  if (start && end) {
    // Automatically calculate duration in days
    const delta = +new Date(end) - +new Date(start);
    const daysDelta = Math.floor(delta / (1000 * 60 * 60 * 24));
    entries.push(["Duration", `${daysDelta} days`]);
  }

  if (startTime && endTime) {
    entries.push([
      "Duration",
      `${differenceInHours(new Date(startTime), new Date(endTime))} hours`,
    ]);
  }

  // Add trip currency symbol
  addCurrency("price");
  addCurrency("Total");
  addCurrency("Activities");
  addCurrency("Lodgings");
  addCurrency("Transports");
</script>

{#if entries.length}
  <section>
    <header class="capitalize-first text-h3">{header}</header>
    <div class="mt-4 flex flex-col gap-1">
      {#each entries as [key, value]}
        <div class="flex justify-between">
          <span class="capitalize-first">{key}</span>
          <span class="capitalize-first">{value}</span>
        </div>
      {/each}
    </div>
  </section>
{/if}
