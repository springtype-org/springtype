#!/usr/bin/env node

import {getDefaultConfig} from "./function/getDefaultConfig";

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const defaultWebpackConfigPath = 'webpack.config.js';
const args = process.argv.slice(2);
const port = parseInt(args[0], 10) || 8080;

(async () => {

    let configToUse = getDefaultConfig(port);

    // check for ./webpack.config.js -- if it's there, use it,
    // else use the default configuration
    if (fs.existsSync(defaultWebpackConfigPath)) {

        console.log('Found local config: ', defaultWebpackConfigPath);
        configToUse = require(path.resolve(process.cwd(), defaultWebpackConfigPath));
    }

    const options = {
        publicPath: configToUse.output.publicPath,
        hot: true,
        inline: true,
        stats: { colors: true },
        logLevel: 'error'
    };

    const server = new WebpackDevServer(webpack(configToUse), options);

    server.listen(port, 'localhost', (err: any) => {
        if (err) {
            console.error(chalk.red(err));
        }
        console.log('Dev-server listening on port: ', port);
    });

})();