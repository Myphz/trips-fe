<script lang="ts">
  import { card } from "$lib/stores/api/select";
  import { updateCard } from "$lib/stores/api/update";
  import { pick } from "$utils/objects";
  import { onDestroy } from "svelte";
  import { Stars } from "..";
  import { Textarea } from "../form";
  import Details from "./Details.svelte";

  let description = $card?.description ?? "";

  const updateDescription = () => updateCard({ description }, { withToast: false });
  onDestroy(updateDescription);
</script>

{#if $card && $card.type === "trip"}
  <article class="flex flex-col gap-2 text-small">
    <div class="flex justify-center">
      <Stars
        rating={$card.rating || 0}
        mode="all"
        size="big"
        onSelect={(rating) => updateCard({ rating }, { withToast: false })}
      />
    </div>

    <Textarea bind:value={description} on:blur={updateDescription} />

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
