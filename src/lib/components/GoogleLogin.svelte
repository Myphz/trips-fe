<script lang="ts">
  import { supabase } from "$lib/stores/api/client";
  import { setMe } from "$lib/stores/api/select";
  import { createProfile } from "$lib/stores/api/user";
  import { gotoWithScroll } from "$utils/goto";
  import { fail, success } from "$utils/toasts";
  import { Button } from "./form";
  import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

  const signIn = async () => {
    try {
      const response = await GoogleAuth.signIn();
      const { data } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.authentication.idToken,
      });

      const userId = data.session?.user.id;

      if (!userId) return fail({ title: "Error", msg: "Something went wrong. Please retry" });
      // Create profile only if it doesn't exist
      if (!(await setMe(userId))) {
        await createProfile({ id: userId, displayed: response.givenName });
      }
      success({ title: "Logged in", msg: "Logged in successfully!" });
      gotoWithScroll("/");
    } catch (err) {
      fail({ title: "Error", msg: "Something went wrong. Please retry" });
    }
  };
</script>

<Button variant="outlined-primary" on:click={signIn}>
  <div class="flex items-center justify-center gap-2 text-black">
    <img src="/google.png" alt="Google" class="aspect-square h-6" />
    <span>Sign in with Google</span>
  </div>
</Button>
