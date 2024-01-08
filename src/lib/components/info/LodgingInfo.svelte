<script lang="ts">
  import { pickCard, rename } from "$utils/objects";
  import Details from "./Details.svelte";
  import Photos from "../Photos.svelte";
  import InfoLayout from "./InfoLayout.svelte";
  import { card, photos } from "$lib/stores/api/select";

  $: lodgingDetails = {
    ...rename(pickCard("lodging", ["start", "end", "createdAt", "address", "price"]), {
      start: "Check-in",
      end: "Check-out",
      createdAt: "Created at",
    }),
    photos: $photos.length + ($card?.photo ? 1 : 0),
  };
</script>

<InfoLayout>
  <Details header="details" data={lodgingDetails} />

  <Photos />
</InfoLayout>
