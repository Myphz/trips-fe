<script lang="ts">
  import { getTripInfo } from "$lib/stores/api/select";
  import { pick, pickCard, rename } from "$utils/objects";
  import { fail } from "$utils/toasts";
  import Details from "./Details.svelte";
  import InfoLayout from "./InfoLayout.svelte";

  let info: Awaited<ReturnType<typeof getTripInfo>>;
  getTripInfo().then((value) => {
    if (!value) return fail({ title: "Error", msg: "Couldn't load trip info" });
    info = value;
  });
</script>

<InfoLayout>
  <Details
    header="details"
    data={rename(pickCard("trip", ["start", "end", "createdAt"]), {
      start: "Departure",
      end: "Return",
      createdAt: "Created at",
    })}
  />
  {#if info}
    <Details
      withCurrency
      header="Price"
      data={rename(
        pick(info, ["lodging_cost", "place_cost", "total_cost", "transport_cost"]),
        {
          total_cost: "Total",
          lodging_cost: "Lodgings",
          place_cost: "Activities",
          transport_cost: "Transports",
        },
      )}
    />

    <Details
      header="Statistics"
      data={rename(
        pick(info, [
          "num_places",
          "num_lodgings",
          "num_transports",
          "num_trips",
          "num_photos",
        ]),
        {
          num_places: "Activities",
          num_lodgings: "Lodgings",
          num_trips: "Subtrips",
          num_transports: "Transports",
          num_photos: "Photos",
        },
      )}
    />
  {/if}
</InfoLayout>
