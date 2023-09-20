<script lang="ts">
  import { CheckCircle, XCircle } from "svelte-heros";

  export let msg: string;
  export let title: string;

  export let variant: "success" | "error";

  const variantStyles = {
    success: "bg-primary-light border-primary ",
    error: "bg-error-light border-error",
  };

  const textColor = variant === "success" ? "text-primary" : "text-error";
</script>

<div class="flex h-full gap-2 rounded-lg border px-3 py-2 align-top text-black {variantStyles[variant]}">
  <div class="mt-1 {textColor}">
    {#if variant === "success"}
      <CheckCircle size="1.5rem" />
    {:else}
      <XCircle size="1.5rem" />
    {/if}
  </div>
  <div class="flex flex-col">
    <div class="text-small {textColor}">{title}</div>
    <div class="text-xs">{msg}</div>
  </div>
</div>
