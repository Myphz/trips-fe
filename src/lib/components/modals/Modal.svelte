<script lang="ts">
  import { clickoutside } from "@svelte-put/clickoutside";
  import { closeModal } from "$lib/stores/modals";
  import { fade } from "svelte/transition";

  let clicked = false;

  const onClickOutside = () => {
    if (!clicked) return (clicked = true);
    closeModal();
  };
</script>

<dialog
  class="fixed inset-0 z-[60] flex h-full w-full items-center justify-center bg-black bg-opacity-70 dark:bg-[#000000B3] dark:text-black"
  open={true}
  transition:fade={{ duration: 100 }}
>
  <div
    class="fixed bottom-0 w-full rounded-t-xl bg-white px-4 pb-8 pt-2 text-black"
    use:clickoutside
    on:clickoutside={onClickOutside}
  >
    <slot />
  </div>
</dialog>
