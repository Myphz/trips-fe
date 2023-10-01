<script lang="ts">
  import { Photo } from "svelte-heros";
  import { FilePicker } from "@capawesome/capacitor-file-picker";
  import { uploadFiles } from "$lib/stores/files/upload";
  import { PhotoViewer } from "..";
  import { getContext } from "svelte";

  export let name: string;
  export let multiple = false;

  const ctx = getContext<Record<string, string>>("defaultValues") ?? {};

  let photo = ctx[name] ?? "";

  const pickFile = async () => {
    const { files } = await FilePicker.pickMedia({ multiple, readData: true });
    photo = await uploadFiles(files);
  };
</script>

<input type="hidden" {name} value={photo} />
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
  <PhotoViewer bind:photo />
{/if}
