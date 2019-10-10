import { bundle } from "@springtype/bundle";

(async () => {
  await bundle({
    homeDir: "../../",
    entry: "e2e/children/src/index.tsx",
    paths: {
      "@springtype/*": "./*",
    },
    devServer: {
      enabled: process.env.NODE_ENV != "production",
    },
  });
})();
