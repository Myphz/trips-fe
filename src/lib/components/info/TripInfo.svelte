<script lang="ts">
  import { getTripInfo } from "$lib/stores/api/select";
  import { pick, pickCard, rename } from "$utils/objects";
  import { fail } from "$utils/toasts";
  import PhotoViewer from "../PhotoViewer.svelte";
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
        pick(info, [
          "lodging_cost",
          "place_cost",
          "total_cost",
          "transport_cost",
          "food_cost",
        ]),
        {
          place_cost: "Activities",
          food_cost: "Food",
          transport_cost: "Transports",
          lodging_cost: "Lodgings",
          total_cost: "Total",
        },
      )}
    />

    <Details
      header="Statistics"
      data={rename(
        pick(info, [
          "num_places",
          "num_lodgings",
          "num_foods",
          "num_transports",
          "num_trips",
          "num_photos",
        ]),
        {
          num_places: "Activities",
          num_lodgings: "Lodgings",
          num_trips: "Groups",
          num_transports: "Transports",
          num_photos: "Photos",
          num_foods: "Foods",
        },
      )}
    />

    <section class="mt-4">
      <div class="flex items-center justify-between">
        <header class="text-h3 capitalize">Highlights</header>
      </div>

      <div class="mt-2 flex flex-wrap gap-4">
        {#if info.favourite_photos.length}
          {#each info.favourite_photos as photo}
            <PhotoViewer {photo} maxHeight={false} withDelete />
          {/each}
        {/if}
      </div>
    </section>
  {/if}
</InfoLayout>
