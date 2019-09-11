const { pluginTypeChecker } = require('fuse-box-typechecker');
import { fusebox } from "fuse-box";
const path = require('path');
const prod = process.env.NODE_ENV !== "development";

export const bundle = (overlayConfig: any) => {

    (async() => {

        const config = {
            root: process.cwd(),
            homeDir: process.cwd(),
            target: 'browser',
            ...overlayConfig,
            entry: overlayConfig.entry ? overlayConfig.entry : path.resolve(process.cwd(), './src/index.ts'),
            dependencies: {
                include: ['tslib'],
                ...overlayConfig.dependencies
            },
            hmr: prod ? false : true,
            watch: {
                enabled: prod ? false : true,
                ignored: ['dist'],
                ...overlayConfig.watch
            },
            logging: {
                level: 'succinct',
                ...overlayConfig.logging
            },
            webIndex: {
                template: (overlayConfig.webIndex && overlayConfig.webIndex.template) ? 
                    overlayConfig.webIndex.template :
                    path.resolve(process.cwd(), './src/index.html'),
                ...overlayConfig.webIndex
            },
            devServer: {
                enabled: true,
                ...overlayConfig.devServer
            },
            plugins: [
                pluginTypeChecker({
                    basePath: './',
                    tsConfig: './tsconfig.json',
                    ...overlayConfig.typeChecker
                })
            ]
        };

        const fuse = fusebox(config);

        if (prod) {
            await fuse.runProd();

        } else {
            fuse.runDev();
        }
    })();
}