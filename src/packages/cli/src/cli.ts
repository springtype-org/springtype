import create from "./create/create";
import {printHeader} from "./function/printHeader";

const program = require('commander');
const VERSION: string = "0.1.0";

printHeader();

program.version(VERSION).description('SpringType commandline interface');

//load programs
create(program);

program.parse(process.argv);




