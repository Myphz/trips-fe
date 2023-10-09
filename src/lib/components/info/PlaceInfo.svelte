<script lang="ts">
  import { pickCard, rename } from "$utils/objects";
  import Photos from "../Photos.svelte";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";
  import { photos } from "$lib/stores/api/select";
</script>

<InfoLayout>
  <Details
    header="details"
    data={{
      ...rename(pickCard("place", ["name", "date", "createdAt", "address", "price"]), {
        createdAt: "Created at",
        price: "Total price",
      }),
      photos: $photos.length,
    }}
  />

  <Photos />
</InfoLayout>
