<script lang="ts">
  import { goto } from "$app/navigation";
  import Form from "$lib/components/form/Form.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { supabase } from "$lib/stores/api/client";
  import { myId, myProfile, setMe } from "$lib/stores/api/select";
  import { generateUsername } from "$utils/api";
  import { goBack } from "$utils/guard";
  import { fail, success } from "$utils/toasts";

  $: defaultValues = { displayed: $myProfile?.displayed || "" };

  const onSubmit = async (data: { displayed: string }) => {
    const { displayed } = data;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let username = generateUsername(displayed);
      const { error: errorProfile } = await supabase
        .from("profiles")
        .update({ displayed, username })
        .eq("id", $myId);

      if (errorProfile?.code === "23505") {
        username = generateUsername(displayed);
        continue;
      } else if (errorProfile)
        return fail({ title: "Error", msg: "Unknown error. Please retry." });

      break;
    }

    await setMe($myId);
    goto("/");
    success({ title: "Name updated", msg: "Name successfully updated" });
  };
</script>

<section class="flex flex-col gap-4">
  <header class="flex gap-6">
    <button on:click={goBack}>
      <span class="material-symbols-outlined text-[2rem]">arrow_back</span>
    </button>

    <h1 class="font-headers text-h1">Change name</h1>
  </header>

  <Form {defaultValues} autocomplete="off" buttonText="UPDATE" {onSubmit}>
    <Input name="displayed" required placeholder="Username" />
  </Form>
</section>
