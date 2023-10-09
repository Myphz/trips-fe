<script lang="ts">
  import { pick, rename } from "$utils/objects";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";
  import Documents from "../Documents.svelte";
  import { card } from "$lib/stores/api/select";
  import { datetimeToISO } from "$utils/format";
</script>

{#if $card?.type === "transport"}
  <InfoLayout>
    <Details
      header="details"
      data={rename(
        pick(
          {
            ...$card,
            departure: datetimeToISO($card.departure),
            arrival: datetimeToISO($card.arrival),
          },
          ["arrival", "departure", "price", "mean"],
        ),
        { mean: "Mean of transport" },
      )}
    />

    <Documents />
  </InfoLayout>
{/if}
