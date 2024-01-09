<script lang="ts">
  import { clickoutside } from "@svelte-put/clickoutside";

  import type { EntityType } from "$lib/types/api";
  import { isModalOpen } from "$lib/stores/ui";
  import { Redirect } from ".";

  export let icon: EntityType;

  const iconComponents: Record<EntityType, string> = {
    lodging: "bed",
    place: "location_on",
    trip: "folder",
    transport: "train",
  };

  let clicked = false;

  function closeModal() {
    if (!clicked) return (clicked = true);
    isModalOpen.set(false);
  }

  const label = (() => {
    if (icon === "trip") return "group";
    if (icon === "place") return "activity";
    return icon;
  })();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div use:clickoutside on:clickoutside={closeModal} on:click={closeModal}>
  <Redirect
    href="/form/{icon === 'trip' ? 'subtrip' : icon}"
    params={{ entityId: 0 }}
    classes="flex flex-col items-center gap-1 text-small"
  >
    <div
      class="flex aspect-square w-20 items-center justify-center rounded-full bg-primary p-4 [&>*]:h-full [&>*]:w-full"
    >
      <span class="material-symbols-outlined filled text-[3rem]">
        {iconComponents[icon]}
      </span>
    </div>
    <div class="capitalize">{label}</div>
  </Redirect>
</div>
