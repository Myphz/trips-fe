<script lang="ts">
  export let data: Record<string, string | number>;
  export let header: string;
</script>

<section>
  <header class="text-h3 capitalize">{header}</header>
  <div class="mt-4 flex flex-col gap-1">
    {#each Object.entries(data) as [key, value]}
      <div class="flex justify-between">
        <span class="capitalize">{key}</span>
        <span class="capitalize">{value}</span>
      </div>
    {/each}
  </div>
</section>
