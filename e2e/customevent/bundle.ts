import { bundle } from "@springtype/bundle";

bundle({
  homeDir: "../../",
  entry: "e2e/customevent/src/index.tsx",
  devServer: {
    enabled: process.env.NODE_ENV != "production",
  },
});
