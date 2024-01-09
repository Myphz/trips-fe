<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let submit = false;
  export let variant: "primary" | "error" | "outlined-primary" | "outlined-error" = "primary";
  export let disabled = false;

  const styleClasses: Record<typeof variant, string> = {
    primary: "bg-primary dark:text-black",
    error: "bg-error dark:text-black",
    "outlined-primary": "border border-primary text-primary",
    "outlined-error": "border border-error text-error",
  };
</script>

<button
  on:click
  type={submit ? "submit" : "button"}
  {disabled}
  class={twMerge(
    "w-full rounded-lg py-2 text-white disabled:opacity-50",
    styleClasses[variant],
  )}
>
  <slot />
</button>
