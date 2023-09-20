<script lang="ts">
  import { DatePicker } from "@capacitor-community/date-picker";
  import { format } from "date-fns";
  import { getContext } from "svelte";
  import { Calendar } from "svelte-heros";
  import { twMerge } from "tailwind-merge";

  export let placeholder: string;
  export let name: string;

  const ctx = getContext<Record<string, Date>>("defaultValues") ?? {};

  const DATE_FORMAT = "yyyy-MM-dd";

  // Defaults to current date
  let value = ctx[name] ? format(ctx[name], DATE_FORMAT) : format(new Date(), DATE_FORMAT);

  const onClick = async () => {
    const parsed = new Date(value);
    const { value: dateValue } = await DatePicker.present({
      mode: "date",
      format: DATE_FORMAT,
      date: parsed.toISOString(),
    });

    if (!dateValue) return;
    value = dateValue;
  };
</script>

<div class="gray group flex h-10 w-full max-w-[calc(50vw-1.5rem)] text-small">
  <input class="visually-hidden" {value} {name} />
  <button type="button" class="mt-2 flex h-8 w-full rounded-md border border-primary" on:click={onClick}>
    <div
      class="relative flex h-full max-w-[calc(calc(50vw-1.5rem)*0.8)] flex-[4] items-center py-2 pl-3"
      placeholder=""
    >
      <div
        class={twMerge(
          "bg epic-transition absolute flex w-fit items-center justify-start rounded-md text-small group-focus-within:-top-2.5 group-focus-within:text-xs",
          value && "!-top-2.5 !text-xs",
        )}
      >
        {placeholder}
      </div>

      <div class="truncate text-black">{value}</div>
    </div>

    <div class="flex h-full flex-1 items-center justify-center px-2">
      <Calendar size="1.25rem" />
    </div>
  </button>
</div>
