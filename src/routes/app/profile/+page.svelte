<script lang="ts">
  import {
    ArrowLeftOnRectangle,
    ChevronRight,
    Envelope,
    EnvelopeOpen,
    Key,
    Moon,
    PlusCircle,
    Trash,
    User,
  } from "svelte-heros";
  import { invitesN, logout, myId, myProfile, setMe } from "$lib/stores/api/select";
  import { setContext } from "svelte";
  import Select from "$lib/components/form/Select.svelte";
  import { THEME_OPTIONS } from "../../../constants";
  import { toggleModal } from "$lib/stores/modals";
  import FilePicker from "$lib/components/form/FilePicker.svelte";
  import { update } from "$lib/stores/api/update";
  import UserImage from "$lib/components/UserImage.svelte";

  let ref: HTMLInputElement;

  const updatePhoto = async (photos: Record<string, string>) => {
    const photo = photos[Object.keys(photos)?.[0]];
    if (!photo) await update({ table: "profiles", id: $myId, params: { photo: "" } });
    else await update({ table: "profiles", id: $myId, params: { photo } });
    await setMe($myId);
  };

  setContext("defaultValues", { theme: "light" });
</script>

<section class="flex flex-col gap-8">
  <section class="flex flex-col items-center justify-center gap-4">
    <button
      class="relative flex aspect-square w-[100px] items-center justify-center text-white dark:text-black"
      on:click={() => ref.showPicker()}
    >
      <div
        class="aspect-square w-[92%] rounded-full [&>*]:aspect-square [&>*]:h-full [&>*]:w-full [&>*]:rounded-full"
      >
        <UserImage photo={$myProfile?.photo ?? ""} />
      </div>
      <div class="absolute -z-10 h-full w-full rounded-full bg-gradient"></div>
      <div
        class="absolute bottom-[15%] right-0 flex aspect-square w-5 items-center justify-center rounded-full bg-primary"
      >
        <PlusCircle size="1rem" />
      </div>
    </button>

    <div class="flex flex-col items-center justify-center">
      <header class="font-headers text-h1">{$myProfile?.displayed}</header>
      <div>{$myProfile?.username}</div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <FilePicker bind:ref mediaType="image" onNewPhotos={updatePhoto} />

    <header class="font-headers text-h3">Notifications</header>
    <a class="flex justify-between" href="/app/profile/invites">
      <div class="flex items-center gap-2">
        <div class="relative text-primary">
          <EnvelopeOpen size="1.5rem" />
          {#if $invitesN}
            <div
              class="absolute -right-[2px] -top-[2px] flex aspect-square w-3 justify-center rounded-full bg-error text-[7px] leading-none text-white"
            >
              <span class="pt-[2px]">{$invitesN}</span>
            </div>
          {/if}
        </div>

        <div>Invites</div>
      </div>
      <ChevronRight />
    </a>
  </section>

  <section class="flex flex-col gap-4">
    <header class="mt-2 font-headers text-h3">Settings</header>
    <a class="flex justify-between" href="/app/profile/name">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <User size="1.5rem" />
        </div>

        <div>Change username</div>
      </div>
      <ChevronRight />
    </a>

    <a class="flex justify-between" href="/app/profile/email">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <Envelope size="1.5rem" />
        </div>

        <div>Change email</div>
      </div>
      <ChevronRight />
    </a>

    <a class="flex justify-between" href="/app/profile/password">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <Key size="1.5rem" />
        </div>

        <div>Change password</div>
      </div>
      <ChevronRight />
    </a>
  </section>

  <section class="flex flex-col gap-4">
    <header class="mt-2 font-headers text-h3">Customization</header>
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <Moon size="1.5rem" />
        </div>

        <div>Theme</div>
      </div>

      <div class="w-1/2">
        <Select label="" name="theme" options={THEME_OPTIONS} />
      </div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <header class="mt-2 font-headers text-h3">Other</header>
    <button class="flex items-center gap-2 text-primary" on:click={logout}>
      <ArrowLeftOnRectangle />
      <span>Logout</span>
    </button>
    <button
      class="flex items-center gap-2 text-error"
      on:click={() => toggleModal("deleteAccount")}
    >
      <Trash />
      <span>Delete account</span>
    </button>
  </section>
</section>
