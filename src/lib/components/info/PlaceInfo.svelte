<script lang="ts">
  import { pickCard, rename } from "$utils/objects";
  import Photos from "../Photos.svelte";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";
  import { card, photos } from "$lib/stores/api/select";

  $: placeDetails = {
    ...rename(pickCard("place", ["date", "createdAt", "address", "price"]), {
      createdAt: "Created at",
    }),
    photos: $photos.length + ($card?.photo ? 1 : 0),
  };
</script>

<InfoLayout>
  <Details header="details" data={placeDetails} />

  <Photos />
</InfoLayout>
