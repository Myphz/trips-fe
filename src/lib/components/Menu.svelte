<script lang="ts" context="module">
  const CLOSING_ANIMATION_DURATION = 200;
</script>

<script lang="ts">
  import { isMenuOpen } from "$lib/stores/ui";
  import MenuButton from "./MenuButton.svelte";
  import { browser } from "$app/environment";
  import { clickoutside } from "@svelte-put/clickoutside";
  import { twMerge } from "tailwind-merge";
  import { fade } from "svelte/transition";

  const preventDefault = (e: Event) => e.preventDefault();
  $: {
    if (browser) {
      if ($isMenuOpen) {
        window.addEventListener("touchmove", preventDefault);
      } else {
        window.removeEventListener("touchmove", preventDefault);
        clicked = false;
        closing = false;
      }
    }
  }

  let closing = false;
  let clicked = false;

  async function closeModal() {
    if (!clicked) return (clicked = true);
    await forceCloseModal();
  }

  async function forceCloseModal() {
    closing = true;
    await new Promise((res) => setTimeout(res, CLOSING_ANIMATION_DURATION));
    isMenuOpen.set(false);
  }
</script>

{#if $isMenuOpen}
  <dialog
    class="fixed inset-0 z-[60] flex h-full w-full flex-col justify-end bg-black bg-opacity-70 text-white dark:bg-[#000000B3] dark:text-black"
    open={true}
    transition:fade={{ duration: 100 }}
  >
    <section
      class={twMerge(
        "flex flex-col rounded-t-3xl bg-footer px-4 py-8",
        closing ? "closing" : "opening",
      )}
      style="--anim-duration: {CLOSING_ANIMATION_DURATION}ms"
      use:clickoutside
      on:clickoutside={closeModal}
    >
      <header class="mb-8 flex flex-col text-black">
        <div class="flex items-center gap-4">
          <button class="material-symbols-outlined text-[2rem]" on:click={forceCloseModal}>
            arrow_back
          </button>
          <span class="text-h1">Create new entity</span>
        </div>
        <div class="text-small text-gray">Select new entity type</div>
      </header>

      <div class="flex flex-col gap-6">
        <MenuButton icon="trip" />
        <MenuButton icon="place" />
        <MenuButton icon="food" />

        <MenuButton icon="transport" />
        <MenuButton icon="lodging" />
      </div>
    </section>
  </dialog>
{/if}

<style>
  .opening {
    translate: 0 100%;
    animation: slide-up var(--anim-duration) ease-in-out forwards;
  }

  .closing {
    animation: slide-down var(--anim-duration) ease-in-out forwards;
  }

  @keyframes slide-up {
    from {
      translate: 0 100%;
    }
    to {
      translate: 0 0;
    }
  }

  @keyframes slide-down {
    from {
      translate: 0 0;
    }
    to {
      translate: 0 100%;
    }
  }
</style>
