const { pluginTypeChecker } = require("fuse-box-typechecker");
import { existsSync, readFileSync, writeFileSync } from "fs";
import { fusebox, pluginCSS } from "fuse-box";
const path = require("path");
const prod = process.env.NODE_ENV !== "development";

export const bundle = (overlayConfig: any = {}) => {
  return new Promise(resolve => {
    (async () => {
      const projectHasTsConfigFile = existsSync("./tsconfig.json");
      const tsConfigTypeCheckerMixin: any = {};

      if (projectHasTsConfigFile) {
        tsConfigTypeCheckerMixin.tsConfig = "./tsconfig.json";
      }

      const config = {
        target: "browser",
        ...overlayConfig,
        entry: overlayConfig.entry ? overlayConfig.entry : "./src/index.ts",
        dependencies: {
          include: ["tslib"],
          ...overlayConfig.dependencies,
        },
        hmr: true,
        watch: {
          enabled: true,
          ignored: ["dist", "node_modules"],
          ...overlayConfig.watch,
        },
        cache: {
          enabled: false,
          FTL: true,
          ...overlayConfig.cache,
        },
        logging: {
          level: "succinct",
          ...overlayConfig.logging,
        },
        tsConfig: {
          jsx: "react",
          jsxFactory: "tsx",
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          resolveJsonModule: true,
          downlevelIteration: true,
        },
        allowSyntheticDefaultImports: false,
        webIndex: {
          template: overlayConfig.webIndex && overlayConfig.webIndex.template ? overlayConfig.webIndex.template : "./src/index.html",
          ...overlayConfig.webIndex,
        },
        devServer: {
          enabled: true,
          ...overlayConfig.devServer,
        },
        plugins: [
          pluginCSS(/\.(css)$/, {
            asText: true,
          }),
          pluginTypeChecker({
            shortenFilenames: true,
            basePath: "./",
            ...tsConfigTypeCheckerMixin,
            ...overlayConfig.typeChecker,
            skipTsErrors: [
              5055,
              2354 /* false-positive config error of overriding input files when writing and tslib */,
              2403 /* TestCafe/Jest subsequent type overrides (both declare a global test function) */,
            ],
          }),
        ],
      };

      const fuse = fusebox(config);

      if (prod) {
        await fuse.runProd();

        const distWebIndexFile = path.resolve(process.cwd(), config.output || "dist", "index.html");

        let index = readFileSync(distWebIndexFile, "utf8");
        index = index.replace(/src="\//g, 'src="');
        writeFileSync(distWebIndexFile, index);

        resolve();
      } else {
        await fuse.runDev();
        resolve();
      }
    })();
  });
};
