<script lang="ts">
  import { MAIN_PAGE_TITLE, pageTitle } from "$lib/stores/route";
  import { Plus, ArrowLeft } from "svelte-heros";
  import { page } from "$app/stores";
  import { goBack } from "$utils/guard";
  import { modal } from "$utils/modal";

  $: advancedMode = $pageTitle !== MAIN_PAGE_TITLE;
</script>

{#if $page.route.id !== "/"}
  <div class="mb-9 flex items-center justify-between">
    <div class={advancedMode ? "flex items-center gap-6" : null}>
      {#if advancedMode}
        <button on:click={goBack}>
          <ArrowLeft size="2rem" />
        </button>
      {/if}
      <h1 class="font-headers text-h1">{$pageTitle}</h1>
    </div>
    {#if !advancedMode || $page.route.id?.endsWith("/trip")}
      {#if !advancedMode}
        <a href="/app/form/trip" class="text-primary">
          <Plus size="2rem" />
        </a>
      {:else if !$page.route.id?.includes("form")}
        <button class="text-primary" use:modal>
          <Plus size="2rem" />
        </button>
      {/if}
    {/if}
  </div>
{/if}
