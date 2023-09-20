import { App } from "@capacitor/app";

App.addListener("backButton", () => {
  history.back();
});
