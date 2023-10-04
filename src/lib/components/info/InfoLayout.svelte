<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { card } from "$lib/stores/api/select";
  import { updateCard } from "$lib/stores/api/update";

  import { Stars, PhotoViewer } from "..";
  import { Textarea } from "../form";

  let description = $card?.description ?? "";

  const updateDescription = () => updateCard({ description }, { withToast: false });
  beforeNavigate(updateDescription);
</script>

{#if $card}
  <section class="flex flex-col gap-2 text-small">
    <div class="flex justify-center">
      <Stars
        rating={$card.rating || 0}
        mode="all"
        size="big"
        onSelect={(rating) => updateCard({ rating }, { withToast: false })}
      />
    </div>

    <Textarea bind:value={description} on:blur={updateDescription} />

    <div class="mb-8 mt-6 flex flex-col gap-4">
      <slot />
    </div>

    {#if $card.photo && $card.type !== "place"}
      <PhotoViewer photo={$card.photo} maxHeight={false} />
    {/if}
  </section>
{/if}
