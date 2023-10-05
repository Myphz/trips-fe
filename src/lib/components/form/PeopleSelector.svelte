<script lang="ts">
  import { XMark } from "svelte-heros";
  import { Button, Input } from ".";

  export let name: string;

  let inputValue = "";
  let selected: string[] = [];

  let inputRef: HTMLInputElement;

  const onInput = (e: Event) => {
    if (!inputRef) inputRef = e.target as HTMLInputElement;
    inputValue = (e.target as any).value;
  };

  const onPersonSelect = () => {
    if (!inputValue) return;
    if (!selected.some((p) => p === inputValue)) selected = [...selected, inputValue];
    inputValue = "";
    inputRef.value = "";
  };

  const deletePerson = (value: string) => {
    selected = selected.filter((person) => person !== value);
  };
</script>

<div class="flex flex-col gap-2">
  <input type="hidden" value={JSON.stringify(selected)} {name} />

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
    {#each selected as person, i}
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <img src="/user.svg" alt="person" class="aspect-square h-6 rounded-full" />
          <span class="max-w-[50vw] truncate">{person}</span>
        </div>
        <button type="button" class="text-primary" on:click={() => deletePerson(person)}>
          <XMark />
        </button>
      </div>
    {/each}
  </div>
</div>
