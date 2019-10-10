import { bundle } from "@springtype/bundle";

bundle({
  homeDir: "../../",
  entry: "e2e/customelement/src/index.tsx",
  devServer: {
    enabled: process.env.NODE_ENV != "production",
  },
});
