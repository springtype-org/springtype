import {Command} from "commander";
import {createApp} from "./app/app";
import {createComponent} from "./component/component";

const inquirer = require('inquirer');

export default function create(program: Command) {
    program.command('create')
        .alias('c')
        .description('create an new app, component or page')
        .action(async () => {

            const choices = ['app', 'component', 'page'];
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    choices: choices,
                    name: 'action',
                    default: 'component',
                    message: 'Please select create action',
                    filter: function (val: string) {
                        return val.toLowerCase();
                    }
                }
            ]);
            const action: 'component' | 'page' | 'app' = answer.action;
            const projectPath = process.cwd();

            switch (action) {
                case 'component':
                case 'page':
                    await createComponent(projectPath, action);
                    break;
                case 'app':
                    await createApp(projectPath);
                    break;
            }
        });
}
