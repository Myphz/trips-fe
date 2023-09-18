<script lang="ts">
  import { twMerge } from "tailwind-merge";

  export let placeholder: string;
  export let required = false;
  export let name: string;

  let invalid = false;
</script>

<label class="gray group relative block h-10 w-full text-small">
  <input
    class={twMerge(
      "peer absolute inset-0 mt-auto h-8 w-full rounded-md border border-primary p-2",
      invalid && "border-error",
    )}
    on:invalid={() => {
      invalid = true;
    }}
    on:input={() => {
      if (invalid) invalid = false;
    }}
    {required}
    {name}
    placeholder=""
  />
  <div
    class="bg epic-transition absolute left-2 top-0 rounded-md px-1 text-xs group-focus-within:!top-0 group-focus-within:!text-xs peer-placeholder-shown:top-3 peer-placeholder-shown:text-small"
  >
    {placeholder}{required ? "*" : ""}
  </div>
</label>
