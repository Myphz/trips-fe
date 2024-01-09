<script lang="ts">
  import Button from "$lib/components/form/Button.svelte";

  import { supabase } from "$lib/stores/api/client";
  import { goBack } from "$utils/guard";
  import { fail, success } from "$utils/toasts";
  import { AUTH_SERVER_URL } from "../../../constants";

  let loading = false;

  const sendEmail = async () => {
    if (loading) return;
    loading = true;

    const user = await supabase.auth.getUser();
    const email = user.data.user?.email;

    if (!email) return fail({ title: "Error", msg: "Something went wrong. Please retry" });

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${AUTH_SERVER_URL}/password`,
    });

    if (error) return fail({ title: "Error", msg: "Error sending the email. Please retry." });

    success({ title: "Success", msg: "Check your email" });
    goBack();
  };
</script>

<section class="flex flex-col gap-4">
  <header class="flex gap-6">
    <button on:click={goBack}>
      <span class="material-symbols-outlined text-[2rem]">arrow_back</span>
    </button>

    <h1 class="font-headers text-h1">Change password</h1>
  </header>

  <div class="text-small">You will receive a link to your email to update your password</div>

  <Button
    disabled={loading}
    on:click={async () => {
      await sendEmail();
      loading = false;
    }}
  >
    SEND EMAIL
  </Button>
</section>
