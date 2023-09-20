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

<div class="flex min-h-full flex-col gap-1 rounded-lg border p-2 align-top text-black {variantStyles[variant]}">
  <div class="text-small {textColor} flex gap-2">
    {#if variant === "success"}
      <CheckCircle size="1.5rem" />
    {:else}
      <XCircle size="1.5rem" />
    {/if}
    <div>{title}</div>
  </div>

  <div class="text-xs">{msg}</div>
</div>
