import { goto } from "$app/navigation";
import { supabase } from "$lib/stores/api/client";
import { onMount } from "svelte";
import { fail } from "./toasts";
import { undo } from "$lib/stores/route";
import { load } from "$lib/stores/api/select";

function redirect(isLogged: boolean, mustBeLogged: boolean) {
  const redirectTo = mustBeLogged ? "/auth/login" : "/app";

  if (isLogged !== mustBeLogged) {
    // Don't redirect after restore
    if (!sessionStorage.getItem("currentURL")) goto(redirectTo);
    if (mustBeLogged) fail({ msg: "Login to continue", title: "Auth required" });
  }
}

export function authGuard(mustBeLogged = true) {
  onMount(async () => {
    const isLogged = !!(await supabase.auth.getSession()).data.session;
    if (isLogged) load();
    redirect(isLogged, mustBeLogged);

    // TODO: Add redirect to create profile if not set
    supabase.auth.onAuthStateChange((event, session) => {
      // Prevent duplicates
      if (event === "INITIAL_SESSION") return;
      redirect(!!session, mustBeLogged);
      if (session) load();
    });
  });
}

export function goBack() {
  const inTrip =
    window.location.pathname === "/app/trip" ||
    window.location.pathname === "/app/info" ||
    window.location.pathname.startsWith("/app/form");
  if (inTrip && undo()) return;
  if (inTrip) {
    goto("/app");
  } else {
    history.back();
  }
}
