const fs = require('fs');

export const mkdirs = (dir: string) => {
    const dirs = dir.split('/');
    let index = 0;
    let buildDir = dirs[0];
    do {
        if (!fs.existsSync(buildDir)) {
            fs.mkdirSync(buildDir);
        }
        buildDir += '/' + dirs[++index];
    } while (index < dirs.length)
};
