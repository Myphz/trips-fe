<script>
  import { ChevronRight, EnvelopeOpen } from "svelte-heros";
  import User from "$lib/assets/icons/user.svg?raw";
  import { getInvites, myId, select } from "$lib/stores/api/select";
  import { throwError } from "$utils/error";
  import { onMount } from "svelte";

  let name = "Loading...";
  let photo = "";

  let invitesN = 0;

  onMount(async () => {
    while (!$myId) {
      await new Promise((res) => setTimeout(res, 100));
    }

    select({ table: "profiles", cond: { id: $myId } }).then((profile) => {
      const value = profile[0] ?? throwError("Can't find my profile");
      name = value.displayed;
      photo = value.photo;
    });

    getInvites().then((invites) => (invitesN = invites.length));
  });
</script>

<section class="flex flex-col gap-8">
  <section class="flex flex-col items-center justify-center gap-4">
    <div class="relative flex aspect-square w-[100px] items-center justify-center text-white">
      <div class="aspect-square w-24 [&>*]:aspect-square [&>*]:h-full">
        {@html User}
      </div>
      <div class="absolute -z-10 h-full w-full rounded-full bg-gradient"></div>
    </div>

    <header class="font-headers text-h1">{name}</header>
  </section>

  <section class="flex flex-col gap-4">
    <header class="font-headers text-h3">Notifications</header>
    <a class="flex justify-between" href="/app/profile/invites">
      <div class="flex items-center gap-2">
        <div class="relative text-primary">
          <EnvelopeOpen variation="solid" size="1.5rem" />
          {#if invitesN}
            <div
              class="absolute -right-[2px] -top-[2px] flex aspect-square w-3 justify-center rounded-full bg-error text-[7px] leading-none text-white"
            >
              <span class="pt-[2px]">{invitesN}</span>
            </div>
          {/if}
        </div>

        <div>Invites</div>
      </div>

      <ChevronRight />
    </a>
  </section>

  <section>settings</section>
  <section>theme</section>
  <section>deletre</section>
</section>
