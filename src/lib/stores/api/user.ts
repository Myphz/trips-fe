import type { CreateProfile, Register } from "$lib/types/forms";
import type { UnwrapWritable } from "$lib/types/route";
import { generateUsername } from "$utils/api";
import { fail } from "$utils/toasts";
import { supabase } from "./client";
import { myProfile, setMe } from "./select";

export async function createProfile({ id, displayed }: CreateProfile) {
  let profile: UnwrapWritable<typeof myProfile>;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let username = generateUsername(displayed);
    const { error: errorProfile, data } = await supabase
      .from("profiles")
      .insert([
        {
          id,
          displayed,
          username,
        },
      ])
      .select()
      .single();
    if (errorProfile?.code === "23505") {
      username = generateUsername(displayed);
      continue;
    } else if (errorProfile)
      return fail({ title: "Error", msg: "Unknown error. Please retry." });

    profile = data;
    break;
  }

  await setMe(id, profile);
}

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

  await createProfile({ id, displayed });
  return true;
}
