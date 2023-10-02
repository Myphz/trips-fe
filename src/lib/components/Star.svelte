<script lang="ts">
  import { Star } from "svelte-heros";
  import { getTwConfig } from "$utils/tw";

  const twConfig = getTwConfig();
  const accentColor = twConfig.theme.colors.accent;
  const offColor = twConfig.theme.colors.off;

  export let filled = true;
  export let size: "small" | "big" = "small";
</script>

<Star
  variation="solid"
  color={filled ? accentColor : offColor}
  size={size === "small" ? "1rem" : "2rem"}
/>
