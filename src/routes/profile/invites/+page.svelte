<script lang="ts">
  import UserImage from "$lib/components/UserImage.svelte";
  import Empty from "$lib/components/cards/Empty.svelte";
  import { del } from "$lib/stores/api/delete";
  import { getInvites, invitesN } from "$lib/stores/api/select";
  import { update } from "$lib/stores/api/update";

  let invites: Awaited<ReturnType<typeof getInvites>> = [];
  let isLoading = true;

  getInvites().then((value) => {
    invites = value;
    isLoading = false;
  });

  const filterInvite = (id: number) => {
    invites = invites.filter((invite) => invite.id !== id);
    invitesN.set($invitesN - 1);
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
  {#if !invites.length}
    {#if isLoading}
      <div>Loading...</div>
    {:else}
      <Empty customDescription="No invites so far..." />
    {/if}
  {/if}
  {#each invites as invite (invite.id)}
    <article class="flex items-center justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-2 text-regular text-primary">
          <div class="[&>*]:aspect-square [&>*]:w-8">
            <UserImage photo={invite.trips?.entities?.profiles?.photo ?? ""} />
          </div>
          <div>{invite.trips?.entities?.profiles?.displayed}</div>
        </div>
        <div class="text-small">
          {invite.trips?.entities?.profiles?.displayed} has invited you to
          <span class="text-primary">
            {invite.trips?.destination}
          </span>
        </div>
      </div>
      <div class="flex gap-2 text-white dark:text-black">
        <button class="rounded-lg bg-primary p-1" on:click={() => acceptInvite(invite.id)}>
          <span class="material-symbols-outlined text-[1.5rem]">done</span>
        </button>
        <button class="rounded-lg bg-error p-1" on:click={() => kotowaruInvite(invite.id)}>
          <span class="material-symbols-outlined text-[1.5rem]">close</span>
        </button>
      </div>
    </article>
  {/each}
</section>
