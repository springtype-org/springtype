const { pluginTypeChecker } = require("fuse-box-typechecker");
import { fusebox } from "fuse-box";
const fs = require("fs");
const prod = process.env.NODE_ENV !== "development";

export const bundle = (overlayConfig: any = {}) => {
	return new Promise(resolve => {
		(async () => {
			const projectHasTsConfigFile = fs.existsSync("./tsconfig.json");
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
					...overlayConfig.dependencies
				},
				hmr: true,
				watch: {
					enabled: true,
					ignored: ["dist", "node_modules"],
					...overlayConfig.watch
				},
				cache: {
					enabled: prod ? false : true,
					FTL: true
				},
				logging: {
					level: "succinct",
					...overlayConfig.logging
				},
				tsConfig: {
					jsx: "react",
					jsxFactory: "tsx",
					experimentalDecorators: true,
					emitDecoratorMetadata: true,
					resolveJsonModule: true,
					downlevelIteration: true
				},
				allowSyntheticDefaultImports: false,
				webIndex: {
					template:
						overlayConfig.webIndex && overlayConfig.webIndex.template
							? overlayConfig.webIndex.template
							: "./src/index.html",
					...overlayConfig.webIndex
				},
				devServer: {
					enabled: true,
					...overlayConfig.devServer
				},
				plugins: [
					pluginTypeChecker({
						shortenFilenames: true,
						basePath: "./",
						...tsConfigTypeCheckerMixin,
						...overlayConfig.typeChecker,
						skipTsErrors: [
							5055, 2354 /* false-positive config error of overriding input files when writing and tslib */
						]
					})
				]
			};

			const fuse = fusebox(config);

			if (prod) {
				await fuse.runProd();
				resolve();
			} else {
				await fuse.runDev();
				resolve();
			}
		})();
	});
};
