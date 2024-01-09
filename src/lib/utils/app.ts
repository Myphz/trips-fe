import { goto } from "$app/navigation";
import { filter, myId } from "$lib/stores/api/select";
import { paramsHistory, restore } from "$lib/stores/route";
import { routeParams } from "$lib/stores/routeParams";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { get } from "svelte/store";

export const restoreAppState = () => {
  if (!localStorage.getItem("paramsHistory")) return;
  const routeParams = JSON.parse(localStorage.getItem("currentRouteParams")!);
  const paramsHistory = JSON.parse(localStorage.getItem("paramsHistory")!);
  const filter = localStorage.getItem("filter");
  const currentURL = localStorage.getItem("currentURL")!;

  restore(routeParams, paramsHistory, filter as Parameters<typeof restore>[2]);
  goto(currentURL);
  setTimeout(() => sessionStorage.setItem("hasRestored", "yes"), 500);
};

export function deleteAppState() {
  const keys = ["paramsHistory", "currentRouteParams", "filter", "currentURL"];
  for (const key of keys) localStorage.removeItem(key);
}

export function saveStateToLocalStorage() {
  // Don't save anything if not in trip
  if (
    window.location.pathname.includes("auth") ||
    window.location.pathname.includes("old") ||
    window.location.pathname.includes("profile") ||
    !get(myId)
  )
    return;

  const currentRouteParams = {
    entityId: get(routeParams.entityId),
    parent: get(routeParams.parent),
    tripId: get(routeParams.tripId),
  };

  // Save current status
  localStorage.setItem("currentRouteParams", JSON.stringify(currentRouteParams));
  localStorage.setItem("paramsHistory", JSON.stringify(get(paramsHistory)));
  get(filter) && localStorage.setItem("filter", get(filter)!);
  localStorage.setItem("currentURL", window.location.pathname);
}

export async function saveAppState() {
  // The app state has been changed to inactive.
  // Start the background task by calling `beforeExit`.
  const taskId = await BackgroundTask.beforeExit(() => {
    saveStateToLocalStorage();
    // Finish the background task as soon as everything is done.
    BackgroundTask.finish({ taskId });
  });
}
