<script lang="ts">
  import { Photo } from "svelte-heros";
  import { PhotoViewer } from "..";
  import { getContext } from "svelte";
  import FilePicker from "./FilePicker.svelte";

  export let mediaType: "image" | "video" | "both";
  export let name: string;
  export let multiple = false;

  const ctx = getContext<Record<string, Record<string, string>>>("defaultValues") ?? {};
  let photos = ctx[name] ?? {};
  if (typeof photos === "string") photos = { unknown: photos };

  $: photo = photos[Object.keys(photos)?.[0]] ?? "";

  let ref: HTMLInputElement;

  const pickFile = () => {
    ref.showPicker();
  };
</script>

<input type="hidden" {name} value={photo} />
<FilePicker bind:ref {mediaType} {multiple} bind:photos />

{#if !photo}
  <button
    on:click={pickFile}
    type="button"
    class="flex w-full items-center justify-center gap-1 rounded-md border border-dashed border-primary py-2.5 text-small"
  >
    <div class="text-primary">
      <Photo size="2rem" />
    </div>
    <span>Add photo</span>
  </button>
{:else}
  <PhotoViewer withCross {photo} onCrossClick={() => (photos = {})} />
{/if}
