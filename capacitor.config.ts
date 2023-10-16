import { CapacitorConfig } from "@capacitor/cli";
import { GOOGLE_CLIENT_ID_ANDROID } from "./src/constants";

const config: CapacitorConfig = {
  appId: "com.tripsphoexa.app",
  appName: "Trips!",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      clientId: GOOGLE_CLIENT_ID_ANDROID,
      androidClientId: GOOGLE_CLIENT_ID_ANDROID,
      serverClientId: GOOGLE_CLIENT_ID_ANDROID,
      scopes: ["profile", "email"],
    },
  },
};

export default config;
