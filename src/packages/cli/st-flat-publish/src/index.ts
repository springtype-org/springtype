#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
import { execSync} from "child_process";

const args = process.argv.slice(2);

const projectDirectory = process.cwd();
const deploymentDirectoryName = args[0] || 'dist';
const deploymentDirectory = path.resolve(projectDirectory, deploymentDirectoryName);
const filesToPublishInDeploymentDirectory = process.argv.slice(3);

process.chdir(projectDirectory);

console.log(chalk.cyan('> npm run clean:all'));
execSync(`npm run clean:all`);

console.log(chalk.cyan('> npm install'));
execSync(`npm install`);

console.log(chalk.cyan('> npm run build'));
execSync(`npm run build`);

console.log(chalk.cyan(`> npx st-cp ${filesToPublishInDeploymentDirectory.join(' ')} ${deploymentDirectory}`));
execSync(`npx st-cp ${filesToPublishInDeploymentDirectory.join(' ')} ${deploymentDirectory}`);

process.chdir(deploymentDirectory);

console.log(chalk.cyan('> npm publish'));
execSync(`npm publish`);

console.log(chalk.cyan(`> npx st-rm-rf ${filesToPublishInDeploymentDirectory.join(' ')}`));
execSync(`npx st-rm-rf ${filesToPublishInDeploymentDirectory.join(' ')}`);