<script lang="ts">
  export let submit = false;
  export let variant: "primary" | "error" = "primary";

  const styleClasses: Record<typeof variant, string> = {
    primary: "primary",
    error: "bg-error",
  };
</script>

<button on:submit type={submit ? "submit" : "button"} class="w-full rounded-lg py-2 text-white {styleClasses[variant]}">
  <slot />
</button>
