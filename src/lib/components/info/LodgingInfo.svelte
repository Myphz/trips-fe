<script lang="ts">
  import { pickCard, rename } from "$utils/objects";
  import Details from "./Details.svelte";
  import Photos from "../Photos.svelte";
  import InfoLayout from "./InfoLayout.svelte";
</script>

<InfoLayout>
  <Details
    header="details"
    data={rename(pickCard("lodging", ["start", "end", "createdAt", "address", "price"]), {
      start: "Check-in",
      end: "Check-out",
      createdAt: "Created at",
      price: "Total price",
    })}
  />

  <Photos />
</InfoLayout>
