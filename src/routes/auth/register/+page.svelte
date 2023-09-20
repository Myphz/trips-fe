<script lang="ts">
  import { Form, Input } from "$lib/components/form";
  import { supabase } from "$lib/stores/api";
  import { setPageTitle } from "$lib/stores/route";

  import { fail, success } from "../../../utils/toasts";

  setPageTitle("Sign Up");

  type FormData = {
    email: string;
    password: string;
    confirm: string;
    displayed: string;
  };

  const onSubmit = async ({ email, password, confirm, displayed }: FormData) => {
    if (password !== confirm)
      return fail({
        title: "Invalid password",
        msg: "The passwords are not the same. Please retry.",
      });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error)
      return fail({
        title: "Error",
        msg: error.message,
      });

    success({ title: "Account registered", msg: "Verify your email to login!" });
  };
</script>

<Form buttonText="Sign Up" {onSubmit}>
  <div class="flex flex-col gap-2">
    <Input placeholder="Username" name="displayed" required />
    <Input placeholder="Email" name="email" required />
    <Input placeholder="Password" type="password" name="password" required />
    <Input placeholder="Confirm Password" type="password" name="confirm" required />
  </div>
</Form>

<div class="mt-3 flex justify-center gap-1 text-small">
  <span>Already registered?</span>
  <a href="/auth/login" class="text-primary underline">Login</a>
</div>
