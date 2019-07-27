import {distDirectory} from "../../definition/distDirectory";
const path = require('path');
const fs = require('fs');

export function writeDistPackageJson(packageJson: any) {

    const packageJsonPath = path.resolve(distDirectory, 'package.json');
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
}