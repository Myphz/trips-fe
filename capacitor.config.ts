import { CapacitorConfig } from "@capacitor/cli";
import { GOOGLE_CLIENT_ID } from "./src/constants";

const config: CapacitorConfig = {
  appId: "com.tripsphoexa.app",
  appName: "Trips!",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  plugins: {
    GoogleAuth: {
      clientId: GOOGLE_CLIENT_ID,
      scopes: ["profile", "email"],
    },
  },
};

export default config;
