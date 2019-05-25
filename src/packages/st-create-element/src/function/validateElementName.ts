const chalk = require('chalk');

export const validateElementName = (elementName: string) => {

    const allowedCharacters = /[a-z0-9-]/gi;
    const containsDash = elementName.indexOf('-') > -1;
    let containsIrregularCharacter = false;

    if (!allowedCharacters.test(elementName)) {
        containsIrregularCharacter = true;
    }

    if (!containsDash) {
        console.error(
            chalk.red(
                `The element ${chalk.green(
                    elementName
                )} does not have any dash (-).\n` +
                `Every custom element name should contain a dash and be structured like that:\n\n`
            ) +
            chalk.cyan('myapp-element-name') +
            chalk.red('\n\nPlease choose an element name with this pattern.')
        );
        process.exit(1);
    }

    if (containsIrregularCharacter) {
        console.error(
            chalk.red(
                `The element ${chalk.green(
                    elementName
                )} has invalid characters.\n` +
                `A custom element name should only contain lowercase characters, numbers and dash symbols.\n\n`
            )
        );
        process.exit(1);
    }
};