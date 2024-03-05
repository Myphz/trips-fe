<script lang="ts">
  import { EMPTY_METADATA, downloadImage, getPhotoURL } from "$utils/files";
  import { twMerge } from "tailwind-merge";
  import Loading from "./cards/Loading.svelte";
  import { deletePhoto } from "$lib/stores/api/delete";
  import { loadPhotos } from "$lib/stores/api/select";
  import type { Photos } from "$lib/types/api";
  import { isShowingImageFullscreen, toggleModal } from "$lib/stores/modals";
  import { currentPhoto } from "$lib/stores/files/upload";

  export let photo: string | Photos[string];

  export let maxHeight = true;
  export let small = false;
  export let isPortrait = false;
  export let withCross = false;
  export let withDelete = false;
  export let onCrossClick: () => unknown = () => {};

  const actualPhoto = typeof photo === "string" ? { id: photo, ...EMPTY_METADATA } : photo;

  let fullScreen = false;
  let url = "";

  getPhotoURL(actualPhoto.id).then((l) => (url = l));

  const onLoad = (e: Event) => {
    const image = e.target as HTMLImageElement;
    isPortrait = image.naturalHeight > image.naturalWidth;
  };

  const showPhotoInfo = () => {
    toggleModal("photoInfo");
  };

  $: if (!$isShowingImageFullscreen) fullScreen = false;

  const setFullscreen = (val: boolean) => {
    fullScreen = val;
    $isShowingImageFullscreen = val;
    $currentPhoto = actualPhoto;
  };
</script>

{#if actualPhoto?.id}
  {#if !fullScreen}
    {#if url}
      <button
        class="relative flex justify-center rounded-xl"
        on:click={() => setFullscreen(true)}
      >
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
            class="absolute right-1 top-1 text-primary"
            on:click={onCrossClick}
          >
            <span class="material-symbols-outlined text-[2rem] text-error">close</span>
          </button>
        {/if}
      </button>
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
          <button
            class="text-white dark:text-black"
            on:click={() => downloadImage(actualPhoto.id)}
          >
            <span class="material-symbols-outlined text-[2rem]">share</span>
          </button>
          <button class="text-primary" on:click={() => downloadImage(actualPhoto.id)}>
            <span class="material-symbols-outlined text-[2rem]">download</span>
          </button>
          <button class="text-white dark:text-black" on:click={showPhotoInfo}>
            <span class="material-symbols-outlined text-[2rem]">info</span>
          </button>
          {#if withDelete}
            <button
              class="text-error"
              on:click={async () => {
                await deletePhoto(actualPhoto.id);
                setFullscreen(false);
                loadPhotos();
              }}
            >
              <span class="material-symbols-outlined text-[2rem]">delete</span>
            </button>
          {/if}
        </div>
      </div>
      <img src={url} alt="Trip" class="h-full w-full object-contain" />
    </div>
  {/if}
{/if}
