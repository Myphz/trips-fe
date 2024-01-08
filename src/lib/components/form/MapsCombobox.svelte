<script lang="ts">
  import type { Option } from "$lib/types/other";
  import { generateToken, getPredictions } from "$lib/stores/maps";
  import { Combobox } from ".";
  import { onMount } from "svelte";

  export let name: string;
  export let label: string;

  onMount(() => {
    generateToken();
  });

  let options: Option[] = [];
  async function setOptions(search: string) {
    const predictions = await getPredictions(search);
    options = predictions.map((predict) => {
      const label = `${predict.structured_formatting.main_text}, ${
        predict.terms.at(-2)?.value
      }, ${predict.terms.at(-1)?.value}`;

      return {
        label,
        value: JSON.stringify({ maps_id: predict.place_id, [name]: label }),
      };
    });
  }
</script>

<Combobox onInput={setOptions} {name} {label} {options} />
