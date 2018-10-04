#!/usr/bin/env ts-node

import {Cli} from "../cli/cli";

import("../cli/cli").then(() => {

    const cli = new Cli();
    cli.run();
});