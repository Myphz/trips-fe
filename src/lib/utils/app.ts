import { goto } from "$app/navigation";
import { filter } from "$lib/stores/api/select";
import { paramsHistory, restore } from "$lib/stores/route";
import { routeParams } from "$lib/stores/routeParams";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { get } from "svelte/store";

export const restoreAppStatus = () => {
  const routeParams = JSON.parse(sessionStorage.getItem("currentRouteParams")!);
  const paramsHistory = JSON.parse(sessionStorage.getItem("paramsHistory")!);
  const filter = sessionStorage.getItem("filter");
  const currentURL = sessionStorage.getItem("currentURL")!;

  restore(routeParams, paramsHistory, filter as Parameters<typeof restore>[2]);
  goto(currentURL);
  return;
};

export async function saveAppState() {
  // The app state has been changed to inactive.
  // Start the background task by calling `beforeExit`.
  const taskId = await BackgroundTask.beforeExit(() => {
    const currentRouteParams = {
      entityId: get(routeParams.entityId),
      parent: get(routeParams.parent),
      tripId: get(routeParams.tripId),
    };

    // Save current status
    sessionStorage.setItem("currentRouteParams", JSON.stringify(currentRouteParams));
    sessionStorage.setItem("paramsHistory", JSON.stringify(get(paramsHistory)));
    get(filter) && sessionStorage.setItem("filter", get(filter)!);
    sessionStorage.setItem("currentURL", window.location.pathname);

    // Finish the background task as soon as everything is done.
    BackgroundTask.finish({ taskId });
  });
}
