import { goto } from "$app/navigation";
import { filter } from "$lib/stores/api/select";
import { isDarkMode, paramsHistory, restore } from "$lib/stores/route";
import { routeParams } from "$lib/stores/routeParams";
import { goBack } from "$utils/guard";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { BackgroundTask } from "@capawesome/capacitor-background-task";
import { get } from "svelte/store";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

export function appConfig() {
  App.addListener("backButton", async () => {
    if (window.location.pathname === "/") return await App.exitApp();
    goBack();
  });

  if (Capacitor.getPlatform() !== "web") {
    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({ overlay: true });
    StatusBar.setStyle({ style: Style.Dark });
  }

  isDarkMode.subscribe((isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  });

  isDarkMode.set(localStorage.getItem("theme") === "dark");

  async function saveAppState() {
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

  if (Capacitor.getPlatform() !== "web") {
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

      await saveAppState();
    });

    App.addListener("pause", saveAppState);
  }
}

async function getPrimaryColor() {
  if (get(isDarkMode)) return "#007F6D";
  return "#00A991";
}

export async function getAppearancePref() {
  const primaryColor = await getPrimaryColor();
  NavigationBar.setColor({ color: primaryColor });
  // @ts-ignore
  return localStorage.getItem("theme");
}

export function setAppearancePref(appearance: string) {
  localStorage.setItem("theme", appearance);
  isDarkMode.set(localStorage.getItem("theme") === "dark");
}

// GoogleAuth.initialize({
//   clientId: 'CLIENT_ID.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });
