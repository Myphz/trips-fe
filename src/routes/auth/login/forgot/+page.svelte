<script lang="ts">
  import Form from "$lib/components/form/Form.svelte";
  import Input from "$lib/components/form/Input.svelte";
  import { supabase } from "$lib/stores/api/client";
  import { setPageTitle } from "$lib/stores/route";
  import { goBack } from "$utils/guard";
  import { success } from "$utils/toasts";
  import { AUTH_SERVER_URL } from "../../../../constants";

  setPageTitle("Recover password");

  const onSubmit = async ({ email }: { email: string }) => {
    if (!email) return;
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${AUTH_SERVER_URL}/password`,
    });

    success({ title: "Success", msg: "Check your email" });
    goBack();
  };
</script>

<section class="flex flex-col gap-4">
  <div class="text-small">You will receive a link to your email to update your password</div>

  <Form buttonText="SEND EMAIL" {onSubmit}>
    <Input type="email" placeholder="Email" name="email" />
  </Form>
</section>
