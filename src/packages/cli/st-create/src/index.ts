#!/usr/bin/env node

(() => {
    // https://nodejs.org/docs/latest/api/process.html#process_process_argv
    process.argv = [process.argv[0], process.argv[1], 'create'];
    require('springtype/dist/index');
})();