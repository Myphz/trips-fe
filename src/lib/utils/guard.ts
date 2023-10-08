import { goto } from "$app/navigation";
import { supabase } from "$lib/stores/api/client";
import { onMount } from "svelte";
import { fail } from "./toasts";
import { undo } from "$lib/stores/route";
import { load, setMe } from "$lib/stores/api/select";

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
    const session = (await supabase.auth.getSession()).data.session;
    if (session) {
      load();
      if (!(await setMe(session.user.id))) {
        fail({ title: "Profile not found", msg: "Create your profile to continue" });
        supabase.auth.signOut();
      }
    }
    redirect(!!session, mustBeLogged);

    // TODO: Add redirect to create profile if not set
    supabase.auth.onAuthStateChange(async (event, session) => {
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
