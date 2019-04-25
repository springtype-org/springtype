import {validateFeatureName} from "./validateFeatureName";
import {enableRouter} from "../feature/enableRouter";
import {validateIsSpringTypeProject} from "./validateIsSpringTypeProject";
import {enablei18n} from "../feature/enablei18n";

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

        case "i18n":
            await enablei18n();
            return;

    }
};