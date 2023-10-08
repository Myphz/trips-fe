<script lang="ts">
  import Button from "$lib/components/form/Button.svelte";

  import { supabase } from "$lib/stores/api/client";
  import { goBack } from "$utils/guard";
  import { fail, success } from "$utils/toasts";
  import { ArrowLeft } from "svelte-heros";

  const sendEmail = async () => {
    const user = await supabase.auth.getUser();
    const email = user.data.user?.email;

    if (!email) return fail({ title: "Error", msg: "Something went wrong. Please retry" });

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://wopp.dev/trips/password",
    });

    success({ title: "Success", msg: "Check your email" });
    goBack();
  };
</script>

<section class="flex flex-col gap-4">
  <header class="flex gap-6">
    <button on:click={goBack}>
      <ArrowLeft size="2rem" />
    </button>

    <h1 class="font-headers text-h1">Change password</h1>
  </header>

  <div class="text-small">You will receive a link to your email to update your password</div>

  <Button on:click={sendEmail}>SEND EMAIL</Button>
</section>
