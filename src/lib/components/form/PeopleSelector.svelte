<script lang="ts">
  import { XMark } from "svelte-heros";
  import { Button, Input } from ".";
  import { myId, select } from "$lib/stores/api/select";
  import { routeParams } from "$lib/stores/routeParams";
  import UserImage from "../UserImage.svelte";
  import type { SelectedUser } from "$lib/types/forms";

  export let name: string;

  const { entityId } = routeParams;

  let inputValue = "";
  let selected: SelectedUser[] = [];

  if ($entityId) {
    // Set default value
    select({ table: "groups", cond: { trip_id: $entityId } })
      .then((groups) =>
        Promise.all(
          groups
            .filter((group) => group.user_id !== $myId)
            .map((group) => select({ table: "profiles", cond: { id: group.user_id } })),
        ),
      )
      .then((users) => (selected = users.flat()));
  }

  let inputRef: HTMLInputElement;

  const onInput = (e: Event) => {
    if (!inputRef) inputRef = e.target as HTMLInputElement;
    inputValue = (e.target as any).value;
  };

  const onPersonSelect = () => {
    if (!inputValue) return;
    if (!selected.some((p) => p.username === inputValue))
      selected = [...selected, { username: inputValue }];
    inputValue = "";
    inputRef.value = "";
  };

  const deletePerson = (value: string) => {
    selected = selected.filter((person) => person.username !== value);
  };
</script>

<div class="flex flex-col gap-2">
  <input type="hidden" value={JSON.stringify(selected.map((user) => user.username))} {name} />

  <div class="flex flex-col gap-1">
    <Input name="__person" placeholder="People" on:input={onInput} />
    <div class="text-xs">
      Your friend's username, as shown in their profile (e.g., test#4536).
    </div>

    <div class="text-small">
      <Button variant="primary" on:click={onPersonSelect}>Add person</Button>
    </div>
  </div>

  <div class="mb-8 mt-2 flex flex-col gap-2 text-small text-black">
    {#each selected as person}
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <div class="[&>*]:aspect-square [&>*]:h-6 [&>*]:rounded-full">
            <UserImage photo={person.photo ?? ""} />
          </div>
          <span class="max-w-[50vw] truncate">{person.displayed || person.username}</span>
        </div>
        <button
          type="button"
          class="text-primary"
          on:click={() => deletePerson(person.username)}
        >
          <XMark />
        </button>
      </div>
    {/each}
  </div>
</div>
