<script lang="ts">
  import resolveConfig from "tailwindcss/resolveConfig";
  import tailwindConfig from "../../../tailwind.config";
  import { Star } from "svelte-heros";

  const twConfig = resolveConfig(tailwindConfig);
  const color = twConfig.theme?.colors?.accent as string;
</script>

<Star variation="solid" {color} size="1rem" />
