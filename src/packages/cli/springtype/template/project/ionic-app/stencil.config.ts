import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
    namespace: "ionic-integration-app",
    globalStyle: 'src/ionic.css',
    srcDir: "src/stencil-components",
    outputTargets:[
        {
            type: 'dist-global-styles',
            file: "dist/ionic.css"
        }
    ]
};
