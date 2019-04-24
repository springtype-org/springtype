const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const printHowToInstallCorrectly = () => {

    console.log();
    console.log('You can create a valid SpringType app in this folder using:');
    console.log();
    console.log('    npx st-create-app my-app');
    console.log();
};

export const validateIsSpringTypeProject = () => {

    const coreDependency = '@springtype/springtype-incubator-core';
    const projectPackageJsonFile = path.resolve(path.join(process.cwd(), 'package.json'));


    if (!fs.existsSync(projectPackageJsonFile)) {

        console.error(
            chalk.red(
                `This project doesn't look like a SpringType project because package.json is missing.\n`
            )
        );
        printHowToInstallCorrectly();

        process.exit(1);
    }

    const projectPackageJson = require(projectPackageJsonFile);

    if (!projectPackageJson.dependencies || !projectPackageJson.dependencies[coreDependency]) {

        console.error(
            chalk.red(
                `This project (package.json) doesn't look like a SpringType project because the dependency ${chalk.green(
                    coreDependency
                )} is missing.\n`
            )
        );
        printHowToInstallCorrectly();

        process.exit(1);
    }
};