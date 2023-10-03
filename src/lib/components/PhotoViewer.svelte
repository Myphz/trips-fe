<script lang="ts">
  import { XMark } from "svelte-heros";
  import { getPhotoURL } from "$utils/files";
  export let photo: string;

  export let maxHeight = true;
  export let withCross = false;
</script>

{#if photo}
  <div class="relative flex justify-center rounded-xl">
    <img
      src={getPhotoURL(photo)}
      alt="Trip"
      class="rounded-xl object-contain {maxHeight && 'max-h-64'}"
    />
    {#if withCross}
      <button
        type="button"
        class="absolute right-1 top-1 text-primary"
        on:click={() => (photo = "")}
      >
        <XMark size="2rem" />
      </button>
    {/if}
  </div>
{/if}
