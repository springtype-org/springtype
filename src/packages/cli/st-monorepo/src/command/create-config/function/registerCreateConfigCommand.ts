import {Command} from "commander";
import {createConfig} from "./createConfig";

export default function registerCreateConfigCommand(program: Command) {
    program.command('create-config')
        .alias('cc')
        .description('create an new config')
        .action(async () => {

            const projectPath = process.cwd();
            console.log('TODO: create a new st-monorepo.js config in ', projectPath);

            createConfig();
        });
}
