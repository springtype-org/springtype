import {Command} from "commander";

const inquirer = require('inquirer');

export default function enable(program: Command) {
    program.command('enable')
        .alias('e')
        .description('enable an springtype component')
        .action(async () => {
            const answer = await inquirer.prompt([
                {
                    type: 'checkbox',
                    choices: [
                        {name: 'router', checked: true},
                        'state',
                        'i18n',
                        'test',
                        'material-ui'
                    ],
                    name: 'type',
                    message: 'select components: '
                }
            ]);

            console.log(answer)

        });
}
