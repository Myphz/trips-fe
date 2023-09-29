<script lang="ts">
  import resolveConfig from "tailwindcss/resolveConfig";
  import tailwindConfig from "../../../tailwind.config";
  import { Star } from "svelte-heros";

  const twConfig = resolveConfig(tailwindConfig);
  const accentColor = twConfig.theme?.colors?.accent as string;
  const offColor = twConfig.theme?.colors?.off as string;

  export let filled = true;
  export let size: "small" | "big" = "small";
</script>

<Star variation="solid" color={filled ? accentColor : offColor} size={size === "small" ? "1rem" : "2rem"} />
