<script lang="ts">
  import { getName } from "$utils/format";
  import { Redirect, Stars } from "../";
  import type { GetRowTypes } from "$lib/types/api";
  import { getPhotoURL, getPlaceholderImage } from "$utils/files";
  import Loading from "./Loading.svelte";
  import { fade } from "svelte/transition";

  export let data: GetRowTypes;

  let isLoading = true;

  let url = "";

  if (data.photo) {
    getPhotoURL(data.photo).then((l) => {
      url = l;
      isLoading = false;
    });
  } else {
    url = getPlaceholderImage(data);
    isLoading = false;
  }
</script>

{#if data}
  {@const redirectParams = {
    entityId: data.id,
    parent: data.id,
    tripId: data.tripId || data.id,
    ...(data.type === "trip" && {
      currency: data.currency,
      currencyRatio: data.currencyRatio,
    }),
  }}
  {#if !isLoading}
    <article
      class="relative flex h-52 w-full text-white dark:text-black"
      transition:fade={{ duration: 100 }}
    >
      <img
        class="darker-image absolute -z-10 h-full w-full rounded-xl object-cover shadow-md"
        src={url}
        alt="entity"
      />

      <div class="relative flex flex-1 flex-col">
        <Redirect
          href={data.type === "trip" ? "/trip" : "/info"}
          params={data.type === "trip" ? redirectParams : { entityId: data.id }}
          classes="z-20 pb-4 pl-2 pr-4 pt-2 flex flex-1 flex-col"
        >
          <header class="line-clamp-2 break-all text-h3">{getName(data)}</header>
          <slot name="header" />
        </Redirect>

        <div
          class="absolute bottom-0 left-0 flex w-full items-center justify-between pb-4 pl-2 pr-4"
        >
          <Stars rating={data.rating || 0} mode="rating" />

          {#if data.type === "trip"}
            <Redirect
              href="/info"
              classes="z-30"
              params={{
                entityId: data.id,
                currency: data.currency,
                currencyRatio: data.currencyRatio,
              }}
            >
              <span class="material-symbols-outlined text-[2rem]">info</span>
            </Redirect>
          {/if}
        </div>
      </div>
    </article>
  {:else}
    <Loading />
  {/if}
{/if}

<style>
  .darker-image {
    filter: brightness(50%);
  }
</style>
