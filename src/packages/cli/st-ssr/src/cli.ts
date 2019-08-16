#!/usr/bin/env node

import {ssr} from "./function/ssr";
import {saveDOMSnapshot} from "./function/saveDOMSnapshot";
import {defaultBlacklistResources} from "./definition/defaultBlacklistResources";
import chalk from "chalk";
import { resolve } from "path";

const args: Array<string> = process.argv.slice(2);
const blacklistedResources: Array<string> = args.slice(2);

(async() => {

    console.log();
    console.log(chalk.magenta(`=== STEP 1/2: RENDER ===`));
    console.log();

    const startTime = process.hrtime();
    const domContent: string = await ssr(args[0], blacklistedResources || defaultBlacklistResources);
    const timePassed = process.hrtime(startTime);

    console.log(chalk.white(`URL: ${chalk.green(args[0])}`));
    console.log();
    console.log(chalk.white(`Done, took: ${chalk.green(`${timePassed[1] / 1000000000}`)} sec.`));

    console.log();
    console.log(chalk.magenta(`=== STEP 2/2: WRITE FILE ===`));
    console.log();

    saveDOMSnapshot(args[1], domContent);

    console.log(chalk.white(`Done, stored in: ${chalk.green(resolve(args[1]))}`));

    console.log();
})();