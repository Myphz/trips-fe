<script lang="ts">
  import { pickCard } from "$utils/objects";
  import Photos from "../Photos.svelte";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";
</script>

<InfoLayout>
  <Details header="details" data={pickCard("place", ["address", "date", "price"])} />
  <Details
    header="information"
    data={{
      departure: "sadfasf",
      return: "sadfasf",
      currency: "sadfasf",
    }}
  />

  <Photos />
</InfoLayout>
