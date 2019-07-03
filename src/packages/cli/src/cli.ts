import create from "./create/create";
import {printHeader} from "./function/printHeader";
import enable from "./enable/enable";

const program = require('commander');
let version: string = "0.1.0";

printHeader();

program.version(version).description('SpringType commandline interface');

//load programs
create(program);
enable(program);

program.parse(process.argv);




