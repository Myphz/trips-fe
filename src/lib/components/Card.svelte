<script lang="ts">
  import { Stars } from ".";
  import { InformationCircle } from "svelte-heros";
</script>

<article class="relative flex h-52 w-full rounded-xl text-white">
  <img
    class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover"
    src="https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg"
    alt="test"
  />

  <div class="flex flex-1 flex-col pb-4 pl-2 pr-4 pt-2">
    <div class="flex flex-1 flex-col">
      <header class="text-h3">Japan</header>
      <div class="text-xs">Jul 2023</div>
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
