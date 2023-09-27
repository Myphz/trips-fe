import { goBack } from "$utils/guard";
import { App } from "@capacitor/app";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

App.addListener("backButton", () => {
  if (window.location.href.endsWith("/app/trip")) return App.exitApp();
  goBack();
});

// GoogleAuth.initialize({
//   clientId: 'CLIENT_ID.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });
