import type { Register } from "$lib/types/forms";
import { generateUsername } from "$utils/api";
import { supabase } from "./client";

export async function register({ email, password, displayed }: Register) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (!data.user) throw new Error("Couldn't sign up");

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
