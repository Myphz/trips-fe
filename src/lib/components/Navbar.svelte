<script lang="ts">
  import Logo from "$lib/assets/brand/logo-outline.svg?raw";
  import { getInvites, invitesN, myId, myProfile } from "$lib/stores/api/select";
  import { onMount } from "svelte";
  import { Redirect, UserImage } from ".";

  onMount(async () => {
    while (!$myId) {
      await new Promise((res) => setTimeout(res, 100));
    }

    getInvites().then((invites) => invitesN.set(invites.length));
  });
</script>

<header
  class="sticky top-0 z-50 mb-12 flex items-center justify-between bg-gradient px-4 pt-6 text-white dark:text-black"
>
  <Redirect
    classes="relative flex aspect-square w-16 items-center justify-center"
    href="/"
    params={{ entityId: 0, parent: 0, tripId: 0 }}
    paramsRedirect={false}
  >
    {@html Logo}
  </Redirect>

  <a href="/profile" class="relative">
    <div
      class="aspect-auto w-10 overflow-hidden rounded-full border-2 border-primary [&>*]:aspect-square [&>*]:w-full"
    >
      <UserImage photo={$myProfile?.photo ?? ""} />
    </div>
    {#if $invitesN}
      <div
        class="absolute right-0 top-0 flex aspect-square w-3 justify-center rounded-full bg-error text-[7px] leading-none text-white"
      >
        <span class="pt-[2px]">{$invitesN}</span>
      </div>
    {/if}
  </a>
</header>
