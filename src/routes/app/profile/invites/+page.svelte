<script lang="ts">
  import { del } from "$lib/stores/api/delete";
  import { getInvites } from "$lib/stores/api/select";
  import { update } from "$lib/stores/api/update";
  import { Check, XMark } from "svelte-heros";

  let invites: Awaited<ReturnType<typeof getInvites>> = [];

  getInvites().then((value) => (invites = value));

  const filterInvite = (id: number) => {
    invites = invites.filter((invite) => invite.id !== id);
  };

  const kotowaruInvite = async (id: number) => {
    await del({ table: "groups", id });
    filterInvite(id);
  };

  const acceptInvite = async (id: number) => {
    await update({ table: "groups", id, params: { accepted: true } });
    filterInvite(id);
  };
</script>

<h1 class="mb-10 font-headers text-h1">My Invites</h1>

<section class="flex flex-col gap-8">
  {#each invites as invite (invite.id)}
    <article class="flex items-center justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-2 text-regular text-primary">
          <img src="/mattia.png" alt="Mattia" />
          <div>{invite.trips?.entities?.profiles?.displayed}</div>
        </div>
        <div class="text-small">
          {invite.trips?.entities?.profiles?.displayed} has invited you to
          <span class="text-primary">
            {invite.trips?.destination}
          </span>
        </div>
      </div>
      <div class="flex gap-2 text-white">
        <button class="rounded-lg bg-primary p-1" on:click={() => acceptInvite(invite.id)}>
          <Check />
        </button>
        <button class="rounded-lg bg-error p-1" on:click={() => kotowaruInvite(invite.id)}>
          <XMark />
        </button>
      </div>
    </article>
  {/each}
</section>
