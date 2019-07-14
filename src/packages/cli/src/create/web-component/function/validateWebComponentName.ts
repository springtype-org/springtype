const chalk = require('chalk');

export const validateWebComponentName = (webComponentName: string): boolean|string => {

    const allowedCharacters = /[a-z0-9-]/gi;
    const containsDash = webComponentName.indexOf('-') > -1;

    let containsIrregularCharacter = false;

    if (!allowedCharacters.test(webComponentName)) {
        containsIrregularCharacter = true;
    }

    if (!containsDash) {
        return `
            ${chalk.red(
                `The web component '${chalk.green(
                    webComponentName
                )}' does not have any dash (-).\n` +
                `Every custom element name should contain a dash and be structured like that:\n\n`
            )}
            ${chalk.cyan('my-element-name')}
            ${chalk.red('\n\nPlease choose an element name with this pattern.')}
        `;
    }

    if (containsIrregularCharacter) {
        return `
            ${chalk.red(
                `The web component '${chalk.green(
                    webComponentName
                )}' has invalid characters.\n` +
                `A custom element name should only contain lowercase characters, numbers and dash symbols.\n\n`
            )}
        `
    }
    return true;
};