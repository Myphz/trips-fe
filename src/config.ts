import { isDarkMode } from "$lib/stores/route";
import { goBack } from "$utils/guard";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { GOOGLE_CLIENT_ID_WEB } from "./constants";
import { restoreAppStatus, saveAppState } from "$utils/app";

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

  if (Capacitor.getPlatform() !== "web") {
    App.addListener("appStateChange", async ({ isActive }) => {
      if (isActive) restoreAppStatus();
      else await saveAppState();
    });

    App.addListener("pause", saveAppState);
  }

  restoreAppStatus();

  GoogleAuth.initialize({
    clientId: GOOGLE_CLIENT_ID_WEB,
    scopes: ["profile", "email"],
  });
}

export async function getAppearancePref() {
  // @ts-ignore
  return localStorage.getItem("theme");
}

export function setAppearancePref(appearance: string) {
  localStorage.setItem("theme", appearance);
  isDarkMode.set(localStorage.getItem("theme") === "dark");
}
