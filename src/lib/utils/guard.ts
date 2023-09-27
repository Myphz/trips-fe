import { goto } from "$app/navigation";
import { supabase } from "$lib/stores/api/client";
import { onMount } from "svelte";
import { fail } from "./toasts";
import { undo } from "$lib/stores/route";

function redirect(isLogged: boolean, mustBeLogged: boolean) {
  const redirectTo = mustBeLogged ? "/auth/login" : "/app";

  if (isLogged !== mustBeLogged) {
    goto(redirectTo);
    fail({ msg: "Login to continue", title: "Auth required" });
  }
}

export function authGuard(mustBeLogged = true) {
  onMount(async () => {
    const isLogged = !!(await supabase.auth.getSession()).data.session;
    redirect(isLogged, mustBeLogged);

    supabase.auth.onAuthStateChange((event, session) => {
      // Prevent duplicates
      if (event === "INITIAL_SESSION") return;
      redirect(!!session, mustBeLogged);
    });
  });
}

export function goBack() {
  const inTrip = window.location.href.endsWith("/app/trip");
  if (inTrip && undo()) return;
  history.back();
}
