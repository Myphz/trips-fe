<script lang="ts">
  import { supabase } from "$lib/stores/api";
  import Card from "./Card.svelte";

  const data = supabase.from("entities").select("*");
</script>

<main>
  <Card />
  {#await data then data}
    {JSON.stringify(data)}
  {/await}
</main>
