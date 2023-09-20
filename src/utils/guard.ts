import { goto } from "$app/navigation";
import { supabase } from "$lib/stores/api";
import { onMount } from "svelte";

function redirect(isLogged: boolean, mustBeLogged: boolean, redirectTo: string) {
  if (isLogged !== mustBeLogged) goto(redirectTo);
}

export function authGuard(mustBeLogged = true, redirectTo = "/auth/login") {
  onMount(async () => {
    const isLogged = !!(await supabase.auth.getSession()).data.session;
    redirect(isLogged, mustBeLogged, redirectTo);

    supabase.auth.onAuthStateChange((_, session) => {
      redirect(!!session, mustBeLogged, redirectTo);
    });
  });
}
