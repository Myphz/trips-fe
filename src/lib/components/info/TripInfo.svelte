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

  // Typescript types don't work well with both `pick()` and `rename()`...
  $: priceDetails =
    info &&
    (pick(
      rename(info, {
        place_cost: "Activities",
        lodging_cost: "Lodgings",
        food_cost: "Food",
        transport_cost: "Transports",
        total_cost: "Total",
      }),
      ["Activities", "Lodgings", "Food", "Transports", "Total"],
    ) as unknown as Record<string, string | number>);

  $: statisticsDetails =
    info &&
    (rename(
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
        num_foods: "Foods",
        num_transports: "Transports",
        num_trips: "Groups",
        num_photos: "Photos",
      },
    ) as unknown as Record<string, string | number>);
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
  {#if info && priceDetails && statisticsDetails}
    <Details withCurrency header="Price" data={priceDetails} />

    <Details header="Statistics" data={statisticsDetails} />
    {#if info.favourite_photos.length}
      <section class="mt-4">
        <div class="flex items-center justify-between">
          <header class="text-h3 capitalize">Highlights</header>
        </div>

        <div class="mt-2 flex flex-wrap gap-4">
          {#each info.favourite_photos as photo}
            <PhotoViewer {photo} maxHeight={false} withDelete />
          {/each}
        </div>
      </section>
    {/if}
  {/if}
</InfoLayout>
