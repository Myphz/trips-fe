<script lang="ts">
  import Place from "$lib/assets/icons/place.svg?raw";
  import Bed from "$lib/assets/icons/bed.svg?raw";
  import Train from "$lib/assets/icons/train.svg?raw";
  import Trip from "$lib/assets/icons/trip.svg?raw";
  import { clickoutside } from "@svelte-put/clickoutside";

  import type { EntityType } from "$lib/types/api";
  import { isModalOpen } from "$lib/stores/ui";
  import { Redirect } from ".";

  export let icon: EntityType;

  const iconComponents: Record<EntityType, string> = {
    lodging: Bed,
    place: Place,
    trip: Trip,
    transport: Train,
  };

  let clicked = false;

  function closeModal() {
    if (!clicked) return (clicked = true);
    isModalOpen.set(false);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div use:clickoutside on:clickoutside={closeModal} on:click={closeModal}>
  <Redirect
    href="/app/form/{icon === 'trip' ? 'subtrip' : icon}"
    params={{ entityId: 0 }}
    classes="flex flex-col items-center gap-1 text-small"
  >
    <div
      class="flex aspect-square w-20 items-center justify-center rounded-full bg-primary p-4 [&>*]:h-full [&>*]:w-full"
    >
      {@html iconComponents[icon]}
    </div>
    <div class="capitalize">{icon}</div>
  </Redirect>
</div>
