import type { Register } from "$lib/types/forms";
import { generateUsername } from "$utils/api";
import { fail } from "$utils/toasts";
import { supabase } from "./client";
import { setMe } from "./select";

export async function register({ email, password, displayed }: Register) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error)
    return fail({
      title: "Error",
      msg: error.message,
    });

  const id = data.session?.user.id;
  if (!id) return fail({ title: "ID not found", msg: "Please retry" });

  // Register profile
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let username = generateUsername(displayed);
    const { error: errorProfile } = await supabase.from("profiles").insert([
      {
        id,
        displayed,
        username,
      },
    ]);
    if (errorProfile?.code === "23505") {
      username = generateUsername(displayed);
      continue;
    } else if (errorProfile)
      return fail({ title: "Error", msg: "Unknown error. Please retry." });

    break;
  }

  // Wait to refresh supabase cache
  await new Promise((res) => setTimeout(res, 200));
  setMe(id);
  return true;
}
