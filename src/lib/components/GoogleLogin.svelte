<script lang="ts">
  import { Button } from "./form";
  import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

  const signIn = async () => {
    try {
      const response = await GoogleAuth.signIn();
      console.log(response);
      alert(JSON.stringify(response));
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
