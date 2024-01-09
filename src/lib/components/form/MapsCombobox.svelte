<script lang="ts">
  import type { Option } from "$lib/types/other";
  import { generateToken, getPredictions } from "$lib/stores/maps";
  import { Combobox } from ".";
  import { onMount } from "svelte";

  export let name: string;
  export let label: string;
  export let onSelect: (value: string) => unknown = () => true;

  onMount(() => {
    generateToken();
  });

  let options: Option[] = [];
  async function setOptions(search: string) {
    const predictions = await getPredictions(search);
    options = predictions.map(({ id, label }) => {
      return {
        label,
        value: JSON.stringify({ maps_id: id, [name]: label }),
      };
    });
  }
</script>

<Combobox
  onInput={setOptions}
  {name}
  {label}
  {options}
  onSelect={(opt) => {
    onSelect(JSON.parse(opt).address);
  }}
/>
