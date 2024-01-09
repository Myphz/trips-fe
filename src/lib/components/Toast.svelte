<script lang="ts">
  export let msg: string;
  export let title: string;

  export let variant: "success" | "error";

  const variantStyles = {
    success: "bg-primary-light border-primary",
    error: "bg-error-light border-error",
  };

  const textColor = variant === "success" ? "text-primary-dark-toast" : "text-error";
</script>

<div
  class="flex min-h-full flex-col gap-1 rounded-lg border p-2 align-top text-black {variantStyles[
    variant
  ]}"
>
  <div class="text-small {textColor} flex gap-2">
    {#if variant === "success"}
      <span class="material-symbols-outlined text-[1.5rem]">check_circle</span>
    {:else}
      <span class="material-symbols-outlined text-[1.5rem]">cancel</span>
    {/if}
    <div>{title}</div>
  </div>

  <div class="ml-1 text-xs dark:text-white">{msg}</div>
</div>
