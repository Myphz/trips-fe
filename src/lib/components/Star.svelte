<script lang="ts">
  import { Star } from "svelte-heros";

  export let filled = true;
  export let size: "small" | "big" = "small";
</script>

<div class={filled ? "text-accent" : "text-off"}>
  <Star variation="solid" size={size === "small" ? "1rem" : "2rem"} />
</div>
