<script lang="ts">
  import Form from "$lib/components/form/Form.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { supabase } from "$lib/stores/api/client";
  import { goBack } from "$utils/guard";
  import { fail } from "$utils/toasts";
  import { ArrowLeft } from "svelte-heros";

  const onSubmit = async ({ email }: { email: string }) => {
    const { data, error } = await supabase.auth.updateUser(
      { email },
      { emailRedirectTo: "https://wopp.dev/trips/confirm_email" },
    );
    if (error)
      return fail({ title: "Error", msg: "Something went wrong. Please retry later" });
    console.log({ data, error });
  };
</script>

<section class="flex flex-col gap-4">
  <header class="flex gap-6">
    <button on:click={goBack}>
      <ArrowLeft size="2rem" />
    </button>

    <h1 class="font-headers text-h1">Change email</h1>
  </header>

  <Form autocomplete="off" buttonText="UPDATE" {onSubmit}>
    <Input name="email" required placeholder="Email" type="email" />
  </Form>
</section>
