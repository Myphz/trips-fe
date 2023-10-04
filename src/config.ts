import { goto } from "$app/navigation";
import { filter } from "$lib/stores/api/select";
import { paramsHistory, restore } from "$lib/stores/route";
import { routeParams } from "$lib/stores/routeParams";
import { goBack } from "$utils/guard";
import { App } from "@capacitor/app";
import { StatusBar, Style } from "@capacitor/status-bar";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { get } from "svelte/store";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

App.addListener("backButton", async () => {
  if (window.location.pathname === "/app" || window.location.pathname === "/")
    return await App.exitApp();
  goBack();
});

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({ overlay: true });
StatusBar.setStyle({ style: Style.Dark });

App.addListener("appStateChange", async ({ isActive }) => {
  if (isActive) {
    // Restore status
    const routeParams = JSON.parse(sessionStorage.getItem("currentRouteParams")!);
    const paramsHistory = JSON.parse(sessionStorage.getItem("paramsHistory")!);
    const filter = sessionStorage.getItem("filter");
    const currentURL = sessionStorage.getItem("currentURL")!;

    restore(routeParams, paramsHistory, filter as Parameters<typeof restore>[2]);
    goto(currentURL);
    return;
  }
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
    sessionStorage.setItem("paramsHistory", JSON.stringify(paramsHistory));
    get(filter) && sessionStorage.setItem("filter", get(filter)!);
    sessionStorage.setItem("currentURL", window.location.pathname);

    // Finish the background task as soon as everything is done.
    BackgroundTask.finish({ taskId });
  });
});

// GoogleAuth.initialize({
//   clientId: 'CLIENT_ID.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });
