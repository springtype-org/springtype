import {validateFeatureName} from "./validateFeatureName";
import {enableRouter} from "../feature/router";
import {validateIsSpringTypeProject} from "./validateIsSpringTypeProject";

const chalk = require('chalk');

export const enableFeature = async(featureName: string) => {

    validateFeatureName(featureName);
    validateIsSpringTypeProject();

    console.log(`Enabling feature ${chalk.green(featureName)}.`);
    console.log();

    switch (featureName) {

        case "router":
            await enableRouter();
            return;
    }
};