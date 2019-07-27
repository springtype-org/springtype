const path = require('path');
const fs = require('fs');

export function writePackageJson(packageJson: any) {

    const packageJsonPath = path.resolve('./package.json');
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
}