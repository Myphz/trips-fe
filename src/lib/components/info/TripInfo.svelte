<script lang="ts">
  import { card } from "$lib/stores/api/select";
  import { pick } from "$utils/objects";
  import { Stars } from "..";
  import { Textarea } from "../form";
  import Details from "./Details.svelte";

  let description = $card?.description ?? "";
</script>

{#if $card && $card.type === "trip"}
  <article class="flex flex-col gap-2 text-small">
    <div class="flex justify-center">
      <Stars rating={$card.rating} mode="all" size="big" />
    </div>

    <Textarea value={description} />

    <div class="mt-6 flex flex-col gap-4">
      <Details header="details" data={pick($card, ["start", "end"])} />
      <Details
        header="information"
        data={{
          departure: "sadfasf",
          return: "sadfasf",
          currency: "sadfasf",
        }}
      />
    </div>
  </article>
{/if}
