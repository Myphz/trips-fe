<script lang="ts">
  import { pickCard, rename } from "$utils/objects";
  import Photos from "../Photos.svelte";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";
  import { photos } from "$lib/stores/api/select";

  $: foodDetails = {
    ...rename(pickCard("food", ["date", "createdAt", "address", "price"]), {
      createdAt: "Created at",
    }),
    photos: $photos.length,
  };
</script>

<InfoLayout>
  <Details header="details" data={foodDetails} />

  <Photos />
</InfoLayout>
