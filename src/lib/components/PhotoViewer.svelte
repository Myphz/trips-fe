<script lang="ts">
  import { downloadImage, getPhotoURL, shareImage } from "$utils/files";
  import { twMerge } from "tailwind-merge";
  import Loading from "./cards/Loading.svelte";
  import { photoId } from "$lib/stores/api/delete";
  import type { Photos } from "$lib/types/api";
  import { isShowingImageFullscreen, toggleModal } from "$lib/stores/modals";
  import { currentPhoto } from "$lib/stores/files/upload";
  import { update } from "$lib/stores/api/update";
  import { loadPhotos } from "$lib/stores/api/select";
  import { useZoomImageWheel } from "@zoom-image/svelte";

  export let photo: Photos[string];

  export let maxHeight = true;
  export let small = false;
  export let isPortrait = false;
  export let withCross = false;
  export let withDelete = false;

  export let onCrossClick: () => unknown = () => {};

  let fullScreen = false;
  let url = "";

  photo?.id && getPhotoURL(photo.id).then((l) => (url = l));

  const onLoad = (e: Event) => {
    const image = e.target as HTMLImageElement;
    isPortrait = image.naturalHeight > image.naturalWidth;
  };

  const showPhotoInfo = () => {
    toggleModal("photoInfo");
  };

  const showDeletePhotoModal = () => {
    photoId.set(photo.id);
    toggleModal("deletePhoto");
  };

  const toggleFavourite = async () => {
    const isFavourite = photo.is_favourite;

    await update({
      table: "photos",
      id: photo.id,
      params: { is_favourite: !isFavourite },
    });

    loadPhotos();
  };

  $: if (!$isShowingImageFullscreen) fullScreen = false;

  const setFullscreen = (val: boolean) => {
    fullScreen = val;
    $isShowingImageFullscreen = val;
    $currentPhoto = photo;
  };

  let container: HTMLDivElement;
  const { createZoomImage } = useZoomImageWheel();

  $: container && createZoomImage(container);
</script>

{#if photo?.id}
  {#if !fullScreen}
    {#if url}
      <div class="relative flex justify-center rounded-xl">
        <img
          src={url}
          alt="Trip"
          on:load={onLoad}
          class={twMerge(
            "rounded-xl object-contain",
            maxHeight && "max-h-64",
            small && isPortrait && "w-[calc(50vw-1.5rem)]",
          )}
        />
        {#if withCross}
          <button
            type="button"
            class="absolute right-1 top-1 z-10 text-primary"
            on:click={onCrossClick}
          >
            <span class="material-symbols-outlined text-[2rem] text-error">close</span>
          </button>
        {/if}
        <button on:click={() => setFullscreen(true)} class="absolute inset-0" />
      </div>
    {:else}
      <Loading />
    {/if}
  {:else}
    <div
      class="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black dark:bg-[#000]"
    >
      <div
        class="fixed top-0 flex h-24 w-full items-center justify-between bg-black bg-opacity-10 px-4 pt-6 text-white dark:bg-[#000]"
      >
        <button on:click={() => setFullscreen(false)} class="dark:text-black">
          <span class="material-symbols-outlined text-[2rem]">arrow_back</span>
        </button>

        <div class="flex gap-4">
          <button class="text-white dark:text-black" on:click={() => shareImage(photo.id)}>
            <span class="material-symbols-outlined text-[2rem]">share</span>
          </button>
          <button class="text-primary" on:click={() => downloadImage(photo.id)}>
            <span class="material-symbols-outlined text-[2rem]">download</span>
          </button>
          <button class="text-white dark:text-black" on:click={toggleFavourite}>
            <span
              class={twMerge(
                "material-symbols-outlined text-[2rem]",
                photo.is_favourite && "filled text-accent",
              )}
            >
              star
            </span>
          </button>

          <button class="text-white dark:text-black" on:click={showPhotoInfo}>
            <span class="material-symbols-outlined text-[2rem]">info</span>
          </button>
          {#if withDelete}
            <button class="text-error" on:click={showDeletePhotoModal}>
              <span class="material-symbols-outlined text-[2rem]">delete</span>
            </button>
          {/if}
        </div>
      </div>

      <div bind:this={container}>
        <img src={url} alt="Trip" class="h-full w-full object-contain" />
      </div>
    </div>
  {/if}
{/if}
