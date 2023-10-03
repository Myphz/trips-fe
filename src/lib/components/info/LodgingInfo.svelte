<script lang="ts">
  import { card } from "$lib/stores/api/select";
  import { updateCard } from "$lib/stores/api/update";
  import { pickCard } from "$utils/objects";
  import Details from "./Details.svelte";
  import { beforeNavigate } from "$app/navigation";
  import InfoLayout from "./InfoLayout.svelte";

  let description = $card?.description ?? "";

  const updateDescription = () => updateCard({ description }, { withToast: false });
  beforeNavigate(updateDescription);
</script>

<InfoLayout>
  <Details header="details" data={pickCard("lodging", ["start", "end"])} />
  <Details
    header="information"
    data={{
      departure: "sadfasf",
      return: "sadfasf",
      currency: "sadfasf",
    }}
  />
</InfoLayout>
