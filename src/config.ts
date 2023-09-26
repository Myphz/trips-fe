import { goBack } from "$utils/guard";
import { App } from "@capacitor/app";
// import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

App.addListener("backButton", goBack);

// GoogleAuth.initialize({
//   clientId: 'CLIENT_ID.apps.googleusercontent.com',
//   scopes: ['profile', 'email'],
//   grantOfflineAccess: true,
// });
