<script lang="ts">
  import { fade } from "svelte/transition";
  import { clickoutside } from "@svelte-put/clickoutside";
  import Input from "./Input.svelte";
  import { MagnifyingGlass } from "svelte-heros";
  import { getPexelsPhoto } from "$utils/pexels";
  import { BarLoader } from "svelte-loading-spinners";
  import { getName } from "$utils/format";
  import { card } from "$lib/stores/api/select";
  import { setContext } from "svelte";
  import { pexelSearch } from "$lib/stores/pexels";

  export let open = false;
  export let onImageSelect: (src: string) => unknown;

  let clicked = false;
  let loading = false;

  $: startSearch = $pexelSearch || getName($card);
  $: setContext("defaultValues", { search: startSearch });

  let photos: Awaited<ReturnType<typeof getPexelsPhoto>> = [];

  const closeModal = () => {
    open = false;
    clicked = false;
  };

  const onClickOutside = () => {
    if (!clicked) return (clicked = true);
    closeModal();
  };

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const { search } = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    if (!search) return;

    loading = true;
    photos = [];
    photos = await getPexelsPhoto(search as string);
    loading = false;
  };
</script>

{#if open}
  <dialog
    class="fixed inset-0 z-[60] flex h-full w-full items-center justify-center bg-black bg-opacity-70 dark:bg-[#000000B3] dark:text-black"
    open={true}
    transition:fade={{ duration: 100 }}
  >
    <div
      class="mx-4 w-full rounded-xl bg-white px-4 pb-8 pt-2 text-black"
      use:clickoutside
      on:clickoutside={onClickOutside}
    >
      <form class="flex items-center gap-2" on:submit={onSubmit} autocomplete="off">
        <Input name="search" placeholder="Search" />
        <button
          class="mt-2 aspect-square h-full p-1 text-primary [&>*]:aspect-square [&>*]:h-full"
        >
          <MagnifyingGlass />
        </button>
      </form>

      <section class="mt-4 w-full">
        {#if photos.length}
          <div class="flex max-h-[60vh] w-full flex-wrap gap-2 overflow-scroll">
            {#each photos as photo}
              {@const src = photo.src.landscape}
              <button
                class="max-h-[30vh] max-w-[calc(50%-0.25rem)] rounded-md object-contain"
                type="button"
                on:click={() => {
                  onImageSelect(src);
                  closeModal();
                }}
              >
                <img alt={photo.alt} class="max-h-full max-w-full rounded-md" {src} />
              </button>
            {/each}
          </div>
        {:else if loading}
          <div class="flex w-full flex-col items-center">
            <span>Loading...</span>
            <div class="text-primary">
              <BarLoader size="70" color="currentColor" />
            </div>
          </div>
        {:else}
          <div class="text-center text-small text-gray">
            Type something to search for images
          </div>
        {/if}
      </section>
    </div>
  </dialog>
{/if}
