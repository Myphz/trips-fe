<script lang="ts">
  export let data: Record<string, string | number>;
  export let header: string;

  const entries = Object.entries(data);
  if (data.Departure && data.Return) {
    // Automatically calculate duration in days
    const delta = +new Date(data.Return) - +new Date(data.Departure);
    const daysDelta = Math.floor(delta / (1000 * 60 * 60 * 24));
    entries.push(["Duration", `${daysDelta} days`]);
  }
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
