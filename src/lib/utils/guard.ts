import { goto } from "$app/navigation";
import { supabase } from "$lib/stores/api/client";
import { fail } from "./toasts";
import { showWarningRedirect, undo } from "$lib/stores/route";
import { load, setMe } from "$lib/stores/api/select";
import { get } from "svelte/store";

function redirect(isLogged: boolean, mustBeLogged: boolean) {
  const redirectTo = mustBeLogged ? "/" : "/app";

  if (isLogged !== mustBeLogged) {
    // Don't redirect after restore
    if (!sessionStorage.getItem("currentURL")) {
      if (mustBeLogged) {
        if (!get(showWarningRedirect)) showWarningRedirect.set(true);
        else fail({ msg: "Login to continue", title: "Auth required" });
      }
      goto(redirectTo);
    }
  }
}

export async function authGuard(mustBeLogged = true) {
  const session = (await supabase.auth.getSession()).data.session;
  if (session) {
    load();
    await setMe(session.user.id);
  }
  redirect(!!session, mustBeLogged);

  supabase.auth.onAuthStateChange(async (event, session) => {
    // Prevent duplicates
    if (event === "INITIAL_SESSION") return;
    redirect(!!session, mustBeLogged);
    if (session) {
      load();
    }
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
