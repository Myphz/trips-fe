<script lang="ts">
  import { MAIN_PAGE_TITLE, pageTitle } from "$lib/stores/route";
  import { Plus, ArrowLeft } from "svelte-heros";
  import { Redirect } from ".";
  import { supabase } from "$lib/stores/api";

  $: advancedMode = $pageTitle !== MAIN_PAGE_TITLE;
</script>

<div class="mb-9 flex items-center justify-between">
  <div class={advancedMode ? "flex items-center gap-6" : null}>
    {#if advancedMode}
      <button
        on:click={() => {
          history.back();
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

<div>
  {#await supabase.auth.getUser() then user}
    {JSON.stringify(user)}
  {/await}
</div>
