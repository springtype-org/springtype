import { bundle } from "@springtype/bundle";

bundle({
  homeDir: "../../",
  entry: "e2e/ionic/src/index.tsx",
  paths: {
    "@springtype/*": "./*",
  },
});
