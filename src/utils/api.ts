import { supabase } from "$lib/stores/api";
import { fail } from "./toasts";

export function generateUsername(displayed: string) {
  const rand = Math.floor(Math.random() * 10001);
  return `${displayed.split(" ")[0]}#${rand}`;
}

type RegisterData = { email: string; password: string; displayed: string };

export async function register({ email, password, displayed }: RegisterData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error)
    return fail({
      title: "Error",
      msg: error.message,
    });

  // Register profile
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let username = generateUsername(displayed);
    const { error: errorProfile } = await supabase.from("profiles").insert([
      {
        id: data.user?.id,
        displayed,
        username,
      },
    ]);

    if (errorProfile?.code === "23505") {
      username = generateUsername(displayed);
      continue;
    } else if (errorProfile) return fail({ title: "Error", msg: "Unknown error. Please retry." });

    break;
  }

  return true;
}
