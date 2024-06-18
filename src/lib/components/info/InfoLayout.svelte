<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { card } from "$lib/stores/api/select";
  import { updateCard } from "$lib/stores/api/update";

  import { Stars, PhotoViewer } from "..";
  import Breadcrumbs from "../cards/Breadcrumbs.svelte";
  import { Textarea } from "../form";

  let description = $card?.description ?? "";

  const updateDescription = () => updateCard({ description }, { withToast: false });
  beforeNavigate(updateDescription);

  const debounce = (func: () => unknown, timeout = 300) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        func();
        timer = null;
      }, timeout);
    };
  };

  const debouncedUpdate = debounce(updateDescription);
</script>

<Breadcrumbs />

{#if $card}
  <section class="flex flex-col gap-6 text-small">
    <div class="flex justify-center">
      <Stars
        rating={$card.rating || 0}
        mode="all"
        size="big"
        onSelect={(rating) => updateCard({ rating }, { withToast: false })}
      />
    </div>

    <Textarea bind:value={description} on:input={debouncedUpdate} />

    <div class="mb-8 mt-2 flex flex-col gap-4">
      <slot />
    </div>

    {#if $card.photo && $card.type !== "place" && $card.type !== "lodging" && $card.type !== "food"}
      <PhotoViewer photo={$card.photo} maxHeight={false} />
    {/if}
  </section>
{/if}
