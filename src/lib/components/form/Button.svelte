<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let submit = false;
  export let variant: "primary" | "error" | "outlined" = "primary";

  const styleClasses: Record<typeof variant, string> = {
    primary: "primary",
    error: "bg-error",
    outlined: "border border-primary text-black",
  };
</script>

<button
  on:submit
  type={submit ? "submit" : "button"}
  class={twMerge("w-full rounded-lg py-2 text-white", styleClasses[variant])}
>
  <slot />
</button>
