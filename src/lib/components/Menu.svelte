<script lang="ts">
  import { isModalOpen } from "$lib/stores/ui";
  import MenuButton from "./MenuButton.svelte";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";

  const preventDefault = (e: Event) => e.preventDefault();
  $: {
    if (browser) {
      if ($isModalOpen) {
        window.addEventListener("scroll", preventDefault);
      } else {
        window.removeEventListener("scroll", preventDefault);
      }
    }
  }
</script>

{#if $isModalOpen}
  <dialog
    class="fixed inset-0 z-[60] flex h-full w-full items-center justify-center bg-black bg-opacity-70 text-white"
    open={true}
    transition:fade={{ duration: 100 }}
  >
    <div class="flex flex-col gap-8">
      <div class="flex gap-24">
        <MenuButton icon="trip" />
        <MenuButton icon="lodging" />
      </div>
      <div class="flex gap-24">
        <MenuButton icon="place" />
        <MenuButton icon="transport" />
      </div>
    </div>
  </dialog>
{/if}
