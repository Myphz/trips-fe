import { goBack } from "$utils/guard";
import { App } from "@capacitor/app";
import { StatusBar } from "@capacitor/status-bar";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

App.addListener("backButton", async () => {
  if (window.location.pathname === "/app" || window.location.pathname === "/")
    return await App.exitApp();
  goBack();
});

// Display content under transparent status bar (Android only)
StatusBar.setOverlaysWebView({ overlay: true });

// GoogleAuth.initialize({
//   clientId: 'CLIENT_ID.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });
