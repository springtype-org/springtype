import chalk from "chalk";

export function chdirSync(dir: string) {
    console.log(chalk.green('>'), chalk.white('cd'), chalk.white(dir));
    process.chdir(dir);
}