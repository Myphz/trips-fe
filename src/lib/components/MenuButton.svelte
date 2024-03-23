<script lang="ts" context="module">
  const ICON_COMPONENTS: Record<EntityType, string> = {
    lodging: "bed",
    place: "location_on",
    trip: "folder",
    transport: "train",
    food: "lunch_dining",
  };

  const MENU_DESCRIPTIONS: Record<EntityType, string> = {
    lodging: "Hotels, B&Bs",
    place: "Events, monuments",
    trip: "Folder for multiple entities",
    transport: "Travel from one place to another",
    food: "Restaurants and food",
  };
</script>

<script lang="ts">
  import { isMenuOpen } from "$lib/stores/ui";

  import type { EntityType } from "$lib/types/api";
  import { Redirect } from ".";

  export let icon: EntityType;

  const closeModal = () => {
    $isMenuOpen = false;
  };

  const label = (() => {
    if (icon === "trip") return "group";
    if (icon === "place") return "activity";
    return icon;
  })();
</script>

<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div on:click={closeModal}>
  <Redirect
    href="/form/{icon === 'trip' ? 'subtrip' : icon}"
    params={{ entityId: 0 }}
    classes="flex items-center justify-between px-4 py-2 w-full rounded-xl bg-primary"
  >
    <div class="flex flex-col">
      <div class="text-h3 capitalize">{label}</div>
      <div class="text-xs">{MENU_DESCRIPTIONS[icon]}</div>
    </div>

    <span class="material-symbols-outlined filled text-[3rem]">
      {ICON_COMPONENTS[icon]}
    </span>
  </Redirect>
</div>
