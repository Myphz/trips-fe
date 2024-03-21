<script lang="ts">
  import { invitesN, logout, myId, myProfile, setMe } from "$lib/stores/api/select";
  import Select from "$lib/components/form/Select.svelte";
  import { toggleModal } from "$lib/stores/modals";
  import FilePicker from "$lib/components/form/FilePicker.svelte";
  import { update } from "$lib/stores/api/update";
  import UserImage from "$lib/components/UserImage.svelte";
  import { isDarkMode } from "$lib/stores/route";
  import { setAppearancePref } from "../../config";
  import { THEME_OPTIONS } from "../../constants";
  import type { Photos } from "$lib/types/api";
  import type { FilePickerRef } from "$lib/types/other";

  let ref: FilePickerRef;

  const updatePhoto = async (photos: Photos) => {
    const photo = photos[Object.keys(photos)?.[0]];
    if (!photo) await update({ table: "profiles", id: $myId, params: { photo: "" } });
    else await update({ table: "profiles", id: $myId, params: photo });
    await setMe($myId);
  };

  $: startValue = $isDarkMode ? "dark" : "light";

  const setTheme = (value: string) => {
    if (typeof window === "undefined") return;
    setAppearancePref(value);
  };
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
        <span class="material-symbols-outlined text-[1rem]">add_circle</span>
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
    <a class="flex justify-between" href="/profile/invites">
      <div class="flex items-center gap-2">
        <div class="relative text-primary">
          <span class="material-symbols-outlined text-[1.5rem]">drafts</span>
          {#if $invitesN}
            <div
              class="absolute -right-[2px] -top-[2px] flex aspect-square w-3 justify-center rounded-full bg-error text-[7px] leading-none text-white dark:text-black"
            >
              <span class="pt-[2px]">{$invitesN}</span>
            </div>
          {/if}
        </div>

        <div>Invites</div>
      </div>
      <span class="material-symbols-outlined text-[1.5rem]">chevron_right</span>
    </a>
  </section>

  <section class="flex flex-col gap-4">
    <header class="mt-2 font-headers text-h3">Settings</header>
    <a class="flex justify-between" href="/profile/name">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <span class="material-symbols-outlined text-[1.5rem]">person</span>
        </div>

        <div>Change username</div>
      </div>
      <span class="material-symbols-outlined text-[1.5rem]">chevron_right</span>
    </a>

    <a class="flex justify-between" href="/profile/email">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <span class="material-symbols-outlined text-[1.5rem]">mail</span>
        </div>

        <div>Change email</div>
      </div>
      <span class="material-symbols-outlined text-[1.5rem]">chevron_right</span>
    </a>

    <a class="flex justify-between" href="/profile/password">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <span class="material-symbols-outlined text-[1.5rem]">key</span>
        </div>

        <div>Change password</div>
      </div>
      <span class="material-symbols-outlined text-[1.5rem]">chevron_right</span>
    </a>
  </section>

  <section class="flex flex-col gap-4">
    <header class="mt-2 font-headers text-h3">Customization</header>
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <div class="text-primary">
          <span class="material-symbols-outlined text-[1.5rem]">dark_mode</span>
        </div>

        <div>Theme</div>
      </div>

      <div class="w-1/2">
        <Select
          label=""
          name="theme"
          options={THEME_OPTIONS}
          onSelect={setTheme}
          {startValue}
        />
      </div>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <header class="mt-2 font-headers text-h3">Other</header>
    <button class="flex items-center gap-2 text-primary" on:click={logout}>
      <span class="material-symbols-outlined text-[1.5rem]">logout</span>
      <span>Logout</span>
    </button>
    <button
      class="flex items-center gap-2 text-error"
      on:click={() => toggleModal("deleteAccount")}
    >
      <span class="material-symbols-outlined text-[1.5rem]">delete</span>
      <span>Delete account</span>
    </button>
  </section>
</section>
