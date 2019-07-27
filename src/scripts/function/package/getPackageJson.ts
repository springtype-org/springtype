const path = require('path');
const fs = require('fs');

export function getPackageJson() {

    // meant to be called in a package directory
    const packageJsonPath = path.resolve('./package.json');
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}