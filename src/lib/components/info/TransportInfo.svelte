<script lang="ts">
  import { pickCard } from "$utils/objects";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";
  import Documents from "../Documents.svelte";
</script>

<InfoLayout>
  <Details
    header="details"
    data={pickCard("transport", ["departurePlace", "arrivalPlace", "price"])}
  />
  <Details
    header="information"
    data={{
      departure: "sadfasf",
      return: "sadfasf",
      currency: "sadfasf",
    }}
  />

  <Documents />
</InfoLayout>
