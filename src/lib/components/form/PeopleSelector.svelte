<script lang="ts">
  import { XMark } from "svelte-heros";
  import { Combobox } from ".";
  import { throwError } from "$utils/error";

  export let name: string;

  const people = [
    {
      name: "Salvo",
      image: "https://xsgames.co/randomusers/assets/avatars/male",
    },
    {
      name: "Mattia",
      image: "https://xsgames.co/randomusers/assets/avatars/male",
    },
    {
      name: "Luca",
      image: "https://xsgames.co/randomusers/assets/avatars/male",
    },
    {
      name: "Antonio",
      image: "https://xsgames.co/randomusers/assets/avatars/male",
    },
    {
      name: "Pietro",
      image: "https://xsgames.co/randomusers/assets/avatars/male",
    },
    {
      name: "Daniel",
      image: "https://xsgames.co/randomusers/assets/avatars/male",
    },
  ];

  const options = people.map((person) => ({ value: person.name, label: person.name }));
  let selected: typeof people = [];

  const onPersonSelect = (value: string) => {
    const person = people.find((person) => person.name === value) ?? throwError("Can't find selected person");
    // Delete person if already selected
    if (selected.some((p) => p.name === person.name)) return deletePerson(person.name);
    selected = [...selected, person];
  };

  const deletePerson = (value: string) => {
    selected = selected.filter((person) => person.name !== value);
  };
</script>

<div class="flex flex-col gap-2">
  <input type="hidden" value={JSON.stringify(selected)} {name} />
  <Combobox
    multiple
    {options}
    label="People"
    onSelect={onPersonSelect}
    multipleSelected={selected.map((selected) => selected.name)}
  />

  <div class="flex flex-col gap-2 text-small text-black">
    {#each selected as person, i}
      <div class="flex justify-between">
        <div class="flex items-center gap-2">
          <img src="{person.image}/{(+new Date() + i) % 78}.jpg" alt="si" class="aspect-square h-6 rounded-full" />
          <span>{person.name}</span>
        </div>
        <button type="button" class="text-primary" on:click={() => deletePerson(person.name)}>
          <XMark />
        </button>
      </div>
    {/each}
  </div>
</div>
