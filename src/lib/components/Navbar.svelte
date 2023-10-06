<script lang="ts">
  import Logo from "$lib/assets/brand/logo-outline.svg?raw";
  import { getInvites, myId } from "$lib/stores/api/select";
  import { onMount } from "svelte";
  import { UserCircle } from "svelte-heros";

  let invitesN = 0;

  onMount(async () => {
    while (!$myId) {
      await new Promise((res) => setTimeout(res, 100));
    }

    getInvites().then((invites) => (invitesN = invites.length));
  });
</script>

<header
  class="sticky top-0 z-50 mb-12 flex items-center justify-between bg-gradient px-4 pt-6 text-white"
>
  <div class="relative flex aspect-square w-16 items-center justify-center">
    {@html Logo}
  </div>

  <a href="/app/profile" class="relative">
    <UserCircle size="2rem" />
    {#if invitesN}
      <div
        class="absolute right-0 top-0 flex aspect-square w-3 justify-center rounded-full bg-error text-[7px] leading-none text-white"
      >
        <span class="pt-[2px]">{invitesN}</span>
      </div>
    {/if}
  </a>
</header>
