import { existsSync, readFileSync, writeFileSync } from "fs";
import { fusebox, pluginCSS } from "fuse-box";
import { IConfig } from "./interface/iconfig";
const { pluginTypeChecker } = require("fuse-box-typechecker");
const path = require("path");
const prod = process.env.NODE_ENV !== "development";

export const bundle = (overlayConfig: IConfig = {}) => {
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
          // @ts-ignore
          include: ["tslib", ...(overlayConfig.dependencies || { include: [] }).include],
          ...overlayConfig.dependencies,
        },
        hmr: true,
        watch: {
          enabled: true,
          // @ts-ignore
          ignored: ["dist", "node_modules", ...(overlayConfig.watch || { ignored: [] }).ignored],

          // @ts-ignore
          ...overlayConfig.watch,
        },
        cache: {
          enabled: false,
          FTL: true,
          // @ts-ignore
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
          // @ts-ignore
          template: overlayConfig.webIndex && overlayConfig.webIndex.template ? overlayConfig.webIndex.template : "./src/index.html",

          // @ts-ignore
          ...overlayConfig.webIndex,
        },
        devServer: {
          enabled: process.env.NODE_ENV != "production",

          // @ts-ignore
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
            // @ts-ignore
            ...overlayConfig.typeChecker,
            skipTsErrors: [
              5055,
              2354 /* false-positive config error of overriding input files when writing and tslib */,
              2403 /* TestCafe/Jest subsequent type overrides (both declare a global test function) */,
              // @ts-ignore
              ...(overlayConfig.typeChecker || { skipTsErrors: [] }).skipTsErrors,
            ],
          }),
          // @ts-ignore
          ...(overlayConfig.plugins || []),
        ],
      };

      // @ts-ignore
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
