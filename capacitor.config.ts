import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.trips.app",
  appName: "Trips!",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
};

export default config;
