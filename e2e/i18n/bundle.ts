import { bundle } from "@springtype/bundle";

(async () => {
  await bundle({
    homeDir: "../../",
    paths: {
      "@springtype/*": "./*",
    },
    entry: "e2e/i18n/src/index.tsx",
    devServer: {
      enabled: process.env.NODE_ENV != "production",
    },
  });
})();
