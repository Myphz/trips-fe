<script lang="ts">
  import { MAIN_PAGE_TITLE, pageTitle } from "$lib/stores/route";

  import { page } from "$app/stores";
  import { goBack } from "$utils/guard";
  import { modal } from "$utils/modal";
  import { card } from "$lib/stores/api/select";
  import { blur } from "svelte/transition";

  $: advancedMode = $pageTitle !== MAIN_PAGE_TITLE;
</script>

{#if !$page.route.id?.startsWith("/profile") && $page.route.id !== "/old"}
  <div
    class="mb-6 mt-4 flex w-full items-center justify-between"
    transition:blur={{ duration: 100 }}
  >
    <div class="flex w-full items-center gap-6">
      {#if advancedMode}
        <button on:click={goBack} transition:blur={{ duration: 100 }}>
          <span class="material-symbols-outlined text-[2rem]">arrow_back</span>
        </button>
      {/if}
      <h1
        class="max-w-[70%] truncate font-headers text-h1"
        transition:blur={{ duration: 100 }}
      >
        {$pageTitle}
      </h1>

      {#if !advancedMode || $page.route.id?.endsWith("/trip")}
        {#if !advancedMode}
          <a
            href="/form/trip"
            class="ml-auto text-primary"
            transition:blur={{ duration: 100 }}
          >
            <span class="material-symbols-outlined text-[2rem]">add</span>
          </a>
        {:else if !$page.route.id?.includes("form")}
          <button class="ml-auto text-primary" use:modal transition:blur={{ duration: 100 }}>
            <span class="material-symbols-outlined text-[2rem]">add</span>
          </button>
        {/if}
      {/if}

      {#if $page.route.id?.includes("info") && $card}
        <div class="ml-auto flex gap-4">
          {#if $card.mapsId}
            <a
              href="https://www.google.com/maps/search/?api=1&query={'address' in $card
                ? encodeURIComponent($card.address)
                : ''}&query_place_id={$card.mapsId}"
              class="ml-auto text-primary"
              transition:blur={{ duration: 100 }}
            >
              <span class="material-symbols-outlined text-[2rem]">location_on</span>
            </a>
          {/if}
          <a
            href="/form/{$card.type === 'trip' && $card.parent ? 'subtrip' : $card.type}"
            class="ml-auto text-primary"
            transition:blur={{ duration: 100 }}
          >
            <span class="material-symbols-outlined text-[2rem]">edit</span>
          </a>
        </div>
      {/if}
    </div>
  </div>
{/if}
