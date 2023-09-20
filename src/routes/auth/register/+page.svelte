<script lang="ts">
  import { Form, Input } from "$lib/components/form";
  import { supabase } from "$lib/stores/api";
  import { setPageTitle } from "$lib/stores/route";

  import { fail } from "../../../utils/toasts";

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

    console.log({
      email,
      password,
    });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error)
      return fail({
        title: "Error",
        msg: error.message,
      });

    // const { data, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });

    // if (error)
    //   fail({
    //     title: "Invalid credentials",
    //     msg: "Invalid email or password. Please retry.",
    //   });
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

<!-- <div class="mt-4 flex flex-col gap-4 text-small">
  <div class="flex items-center gap-4">
    <div class="h-px flex-1 bg-primary"></div>
    <div>OR</div>
    <div class="h-px flex-1 bg-primary"></div>
  </div>

  <GoogleLogin />
</div> -->
