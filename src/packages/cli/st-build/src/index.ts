#!/usr/bin/env node

import {getDefaultConfig} from "st-start/function/getDefaultConfig";

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const defaultWebpackConfigPath = 'webpack.config.js';
const args = process.argv.slice(2);
const host = args[0] || "http://localhost";
const port = parseInt(args[1], 10) || 8080;

(async () => {

    let configToUse = getDefaultConfig(host, port);

    // check for ./webpack.config.js -- if it's there, use it,
    // else use the default configuration
    if (fs.existsSync(defaultWebpackConfigPath)) {

        console.log('Found local config: ', defaultWebpackConfigPath);
        configToUse = require(path.resolve(process.cwd(), defaultWebpackConfigPath));
    }

    // TODO: Output ./dist folder

    webpack(configToUse);

})();