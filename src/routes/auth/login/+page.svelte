<script lang="ts">
  import { Button, Form, Input } from "$lib/components/form";
  import { supabase } from "$lib/stores/api";
  import { setPageTitle } from "$lib/stores/route";
  setPageTitle("Login");
</script>

<Form buttonText="Log In">
  <div class="flex flex-col gap-2">
    <Input placeholder="Email" name="email" />
    <Input placeholder="Password" type="password" name="password" />
    <a href="/" class="mt-2 block text-small text-primary underline">Forgot password?</a>
  </div>
</Form>

<div class="mt-4 flex flex-col gap-4 text-small">
  <div class="flex items-center gap-4">
    <div class="h-px flex-1 bg-primary"></div>
    <div>OR</div>
    <div class="h-px flex-1 bg-primary"></div>
  </div>
  <Button variant="outlined">
    <div class="flex items-center justify-center gap-2">
      <img src="/google.png" alt="Google" class="aspect-square h-6" />
      <span>Sign in with Google</span>
    </div>
  </Button>
</div>
