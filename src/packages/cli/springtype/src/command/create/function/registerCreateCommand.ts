import {Command} from "commander";
import {enumToArray} from "./enumToArray";
import {Category} from "../definition/category";
import {createProject} from "../subcommand/project/function/createProject";
import {createWebComponent} from "../subcommand/web-component/function/createWebComponent";

const inquirer = require('inquirer');

export default function registerCreateCommand(program: Command) {
    program.command('create')
        .alias('c')
        .description('create an new')
        .action(async () => {

            const categories = enumToArray(Category);
            const choice: { action: Category } = await inquirer['prompt']([
                {
                    type: 'list',
                    choices: categories,
                    name: 'action',
                    default: 'component',
                    message: 'Please select create action',
                    filter: function (val: string) {
                        return val.toLowerCase();
                    }
                }
            ]);
            const action: Category = choice.action;
            const projectPath = process.cwd();

            switch (action) {
                case Category.WEB_COMPONENT:
                    await createWebComponent(projectPath);
                    break;
                case Category.PROJECT:
                    await createProject(projectPath);
                    break;
            }
        });
}
