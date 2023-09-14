<script lang="ts">
  import { Combobox } from "$lib/components";
  import Select from "$lib/components/Select.svelte";
  let selected = "";
</script>

<div class="flex items-center justify-between">
  <h1 class="font-headers text-h1">My Trips</h1>
  <button>
    <img src="/plus.svg" alt="plus" class="aspect-square h-6" />
  </button>

  <Select options={[{ label: "a", value: "yes" }]} label="ya" />
</div>
