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

<style>
  .skeleton {
    background: linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 45%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 60%
    );

    background-size: 200% 100%;
    background-position-x: 180%;
    animation: shine 1.5s ease-in-out infinite;
  }

  @keyframes shine {
    to {
      background-position-x: -20%;
    }
  }
</style>
