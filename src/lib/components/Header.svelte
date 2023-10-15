<script lang="ts">
  import { MAIN_PAGE_TITLE, pageTitle } from "$lib/stores/route";
  import { Plus, ArrowLeft } from "svelte-heros";
  import Pencil from "$lib/assets/icons/pencil.svg?raw";
  import Move from "$lib/assets/icons/move.svg?raw";

  import { page } from "$app/stores";
  import { goBack } from "$utils/guard";
  import { modal } from "$utils/modal";
  import { card } from "$lib/stores/api/select";
  import { blur } from "svelte/transition";

  $: advancedMode = $pageTitle !== MAIN_PAGE_TITLE;
</script>

{#if !$page.route.id?.startsWith("/profile") && $page.route.id !== "/old"}
  <div
    class="mb-9 flex w-full items-center justify-between"
    transition:blur={{ duration: 100 }}
  >
    <div class="flex w-full items-center gap-6">
      {#if advancedMode}
        <button on:click={goBack} transition:blur={{ duration: 100 }}>
          <ArrowLeft size="2rem" />
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
            <Plus size="2rem" />
          </a>
        {:else if !$page.route.id?.includes("form")}
          <button class="ml-auto text-primary" use:modal transition:blur={{ duration: 100 }}>
            <Plus size="2rem" />
          </button>
        {/if}
      {/if}

      {#if $page.route.id?.includes("info") && $card}
        <div class="ml-auto flex gap-4">
          <a
            href="/form/{$card.type}"
            class="ml-auto text-primary"
            transition:blur={{ duration: 100 }}
          >
            {@html Move}
          </a>
          <a
            href="/form/{$card.type}"
            class="ml-auto text-primary"
            transition:blur={{ duration: 100 }}
          >
            {@html Pencil}
          </a>
        </div>
      {/if}
    </div>
  </div>
{/if}
