import {Command} from "commander";
import {createComponent} from "./component/component";
import {createProject} from "./project/project";

const inquirer = require('inquirer');

enum Category {
    PROJECT = 'project',
    COMPONENT = 'component'
}

export const enumToArray = (enumme: any) => {
    return Object.keys(enumme)
        .map(key => enumme[key]);
};

export default function create(program: Command) {
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
                case Category.COMPONENT:
                    await createComponent(projectPath, action);
                    break;
                case Category.PROJECT:
                    await createProject(projectPath);
                    break;
            }
        });
}
