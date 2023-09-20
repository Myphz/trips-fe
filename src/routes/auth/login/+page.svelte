<script lang="ts">
  import { Form, Input } from "$lib/components/form";
  import { supabase } from "$lib/stores/api";
  import { setPageTitle } from "$lib/stores/route";

  import { fail } from "../../../utils/toasts";

  setPageTitle("Login");

  type FormData = {
    email: string;
    password: string;
  };

  const onSubmit = async ({ email, password }: FormData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error)
      fail({
        title: "Invalid credentials",
        msg: "Invalid email or password. Please retry.",
      });
  };
</script>

<Form buttonText="Log In" {onSubmit}>
  <div class="flex flex-col gap-2">
    <Input placeholder="Email" name="email" required />
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
