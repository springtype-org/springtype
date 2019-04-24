import {supportedFeaturesList} from "../definition/supportedFeaturesList";
const chalk = require('chalk');

export const validateFeatureName = (featureName: string) => {

    if (supportedFeaturesList.indexOf(featureName) === -1) {
        console.error(
            chalk.red(
                `The feature ${chalk.green(
                    featureName
                )} does not exist.\n` +
                `The following features are supported:\n\n`
            ) +
            chalk.cyan(supportedFeaturesList.map(depName => `  ${depName}`).join('\n')) +
            chalk.red('\n\nPlease choose a feature from that list.')
        );
        process.exit(1);
    }
};