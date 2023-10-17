<script lang="ts">
  import { supabase } from "$lib/stores/api/client";
  import { createProfile } from "$lib/stores/api/user";
  import { fail } from "$utils/toasts";
  import { Button } from "./form";
  import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

  const signIn = async () => {
    try {
      const response = await GoogleAuth.signIn();
      console.log(response);
      alert(JSON.stringify(response));

      const { data } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.authentication.idToken,
      });
      console.log(data);

      if (!data.session?.user.id)
        return fail({ title: "Error", msg: "Something went wrong. Please retry" });

      await createProfile({ id: data.session.user.id, displayed: response.givenName });
    } catch (err) {
      console.log(err);
      alert(err);
      alert(JSON.stringify(err));
    }
  };
</script>

<Button variant="outlined" on:click={signIn}>
  <div class="flex items-center justify-center gap-2">
    <img src="/google.png" alt="Google" class="aspect-square h-6" />
    <span>Sign in with Google</span>
  </div>
</Button>
