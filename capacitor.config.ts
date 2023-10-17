import { CapacitorConfig } from "@capacitor/cli";
import { GOOGLE_CLIENT_ID_WEB } from "./src/constants";

const config: CapacitorConfig = {
  appId: "com.tripsphoexa.app",
  appName: "Trips!",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      clientId: GOOGLE_CLIENT_ID_WEB,
      androidClientId: GOOGLE_CLIENT_ID_WEB,
      serverClientId: GOOGLE_CLIENT_ID_WEB,
      forceCodeForRefreshToken: true,
      scopes: ["profile", "email"],
    },
  },
};

export default config;
