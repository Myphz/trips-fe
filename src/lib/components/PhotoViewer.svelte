<script lang="ts">
  import { ArrowDownTray, ArrowLeft, XMark } from "svelte-heros";
  import { downloadImage, getPhotoURL } from "$utils/files";
  export let photo: string;

  export let maxHeight = true;
  export let withCross = false;

  let fullScreen = false;
  const url = getPhotoURL(photo);
</script>

{#if photo}
  {#if !fullScreen}
    <button
      class="relative flex justify-center rounded-xl"
      on:click={() => (fullScreen = true)}
    >
      <img src={url} alt="Trip" class="rounded-xl object-contain {maxHeight && 'max-h-64'}" />
      {#if withCross}
        <button
          type="button"
          class="absolute right-1 top-1 text-primary"
          on:click={() => (photo = "")}
        >
          <XMark size="2rem" />
        </button>
      {/if}
    </button>
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
