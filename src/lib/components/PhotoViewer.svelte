<script lang="ts">
  import { ArrowDownTray, ArrowLeft, XMark } from "svelte-heros";
  import { downloadImage, getPhotoURL } from "$utils/files";
  import { twMerge } from "tailwind-merge";
  import Loading from "./cards/Loading.svelte";
  export let photo: string;

  export let maxHeight = true;
  export let small = false;
  export let isPortrait = false;
  export let withCross = false;
  export let onCrossClick: () => unknown = () => {};

  let fullScreen = false;

  let isLoading = true;
  let url = "";

  getPhotoURL(photo).then((l) => {
    url = l;
    isLoading = false;
  });

  const onLoad = (e: Event) => {
    const image = e.target as HTMLImageElement;
    isPortrait = image.naturalHeight > image.naturalWidth;
  };
</script>

{#if photo}
  {#if !fullScreen}
    {#if !isLoading}
      <button
        class="relative flex justify-center rounded-xl"
        on:click={() => (fullScreen = true)}
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
            <XMark size="2rem" />
          </button>
        {/if}
      </button>
    {:else}
      <Loading />
    {/if}
  {:else}
    <div class="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black">
      <div
        class="fixed top-0 flex h-24 w-full items-center justify-between bg-black bg-opacity-10 px-4 pt-6 text-white"
      >
        <button on:click={() => (fullScreen = false)}>
          <ArrowLeft size="2rem" />
        </button>

        <button class="text-primary" on:click={() => downloadImage(url)}>
          <ArrowDownTray size="2rem" />
        </button>
      </div>
      <img src={url} alt="Trip" class="h-full w-full object-contain" />
    </div>
  {/if}
{/if}
