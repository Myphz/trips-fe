<script lang="ts">
  import { getPhotoURL } from "$utils/files";
  import Userr from "$lib/assets/icons/user.svg?raw";

  let url = "";
  export let photo: string;

  $: photo && getPhotoURL(photo).then((u) => (url = u));
</script>

{#if !photo}
  {@html Userr}
{:else if url}
  <img src={url} alt="user" />
{:else}
  <div class="skeleton" />
{/if}
