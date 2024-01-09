<script lang="ts">
  export let filled = true;
  export let size: "small" | "big" = "small";
</script>

<div class={filled ? "text-accent" : "text-off"}>
  <span
    class="material-symbols-outlined filled {size === 'small' ? 'text-[1rem]' : 'text-[2rem]'}"
  >
    star
  </span>
</div>
