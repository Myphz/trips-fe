<script lang="ts">
  import { MAIN_PAGE_TITLE, pageTitle } from "$lib/stores/route";
  import { Plus, ArrowLeft } from "svelte-heros";
  import { Redirect } from ".";

  $: advancedMode = $pageTitle !== MAIN_PAGE_TITLE;
</script>

<div class="mb-9 flex items-center justify-between">
  <div class={advancedMode ? "flex items-center gap-6" : null}>
    {#if advancedMode}
      <button
        on:click={() => {
          history.back();
          console.log("ahah");
        }}
      >
        <ArrowLeft size="2rem" />
      </button>
    {/if}
    <h1 class="font-headers text-h1">{$pageTitle}</h1>
  </div>
  {#if !advancedMode}
    <Redirect href="/form/trip" params={{ entityId: undefined }} classes="text-primary">
      <Plus size="2rem" />
    </Redirect>
  {/if}
</div>
