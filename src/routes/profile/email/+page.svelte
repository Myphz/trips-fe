<script lang="ts">
  import Form from "$lib/components/form/Form.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { supabase } from "$lib/stores/api/client";
  import { goBack } from "$utils/guard";
  import { fail, success } from "$utils/toasts";
  import { ArrowLeft } from "svelte-heros";
  import { AUTH_SERVER_URL } from "../../../constants";

  const onSubmit = async ({ email }: { email: string }) => {
    const { error } = await supabase.auth.updateUser(
      { email },
      { emailRedirectTo: `${AUTH_SERVER_URL}/confirm_email` },
    );
    if (error) return fail({ title: "Error", msg: "Something went wrong. Please retry" });

    success({ title: "Success", msg: "Confirm your emails to continue" });
    goBack();
  };
</script>

<section class="flex flex-col gap-4">
  <header class="flex gap-6">
    <button on:click={goBack}>
      <ArrowLeft size="2rem" />
    </button>

    <h1 class="font-headers text-h1">Change email</h1>
  </header>

  <div class="text-small">
    You will have to confirm both your previous and updated email addresses.
  </div>

  <Form autocomplete="off" buttonText="UPDATE" {onSubmit}>
    <Input name="email" required placeholder="Email" type="email" />
  </Form>
</section>
