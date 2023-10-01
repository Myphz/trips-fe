<script lang="ts">
  import { XMark } from "svelte-heros";
  import { getPhotoURL } from "$utils/files";
  export let photo: string;
</script>

{#if photo}
  <div class="relative flex justify-center rounded-xl">
    <img src={getPhotoURL(photo)} alt="Trip" class="max-h-64 rounded-xl object-contain" />
    <button
      type="button"
      class="absolute right-1 top-1 text-primary"
      on:click={() => (photo = "")}
    >
      <XMark size="2rem" />
    </button>
  </div>
{/if}
