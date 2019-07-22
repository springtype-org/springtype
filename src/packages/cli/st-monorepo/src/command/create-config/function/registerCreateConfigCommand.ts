import {Command} from "commander";
import {createConfig} from "./createConfig";

export default function registerCreateConfigCommand(program: Command) {
    program.command('create-config')
        .alias('cc')
        .description('create an new config')
        .action(async () => {
            createConfig();
        });
}
