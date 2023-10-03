<script lang="ts">
  import { goto } from "$app/navigation";
  import { Form, Input } from "$lib/components/form";
  import { supabase } from "$lib/stores/api/client";
  import { setPageTitle } from "$lib/stores/route";

  import { fail, success } from "$utils/toasts";

  setPageTitle("Login");

  type FormData = {
    email: string;
    password: string;
  };

  const onSubmit = async ({ email, password }: FormData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error)
      return fail({
        title: "Invalid login",
        msg: "Invalid email or password. Please retry.",
      });

    success({ title: "Logged in", msg: "Logged in successfully!" });
    goto("/app");
  };
</script>

<Form buttonText="Log In" {onSubmit}>
  <div class="flex flex-col gap-2">
    <Input placeholder="Email" name="email" type="email" required />
    <Input placeholder="Password" type="password" name="password" required />
    <a href="/" class="mt-2 block text-small text-primary underline">Forgot password?</a>
  </div>
</Form>

<!-- <div class="mt-4 flex flex-col gap-4 text-small">
  <div class="flex items-center gap-4">
    <div class="h-px flex-1 bg-primary"></div>
    <div>OR</div>
    <div class="h-px flex-1 bg-primary"></div>
  </div>

  <GoogleLogin />
</div> -->

<div class="mt-3 flex justify-center gap-1 text-small">
  <span>New user?</span>
  <a href="/auth/register" class="text-primary underline">Register</a>
</div>
