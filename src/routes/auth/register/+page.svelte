<script lang="ts">
  import { goto } from "$app/navigation";
  import { Form, Input } from "$lib/components/form";
  import { register } from "$lib/stores/api/user";
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

    if (await register({ email, password, displayed })) {
      goto("/app");
      success({ title: "Account registered", msg: "Remember to verify your email!" });
    }
  };
</script>

<Form buttonText="Sign Up" {onSubmit} autocomplete="on">
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
