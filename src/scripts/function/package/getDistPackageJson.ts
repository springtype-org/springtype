import {distDirectory} from "../../definition/distDirectory";
const path = require('path');
const fs = require('fs');


export function getDistPackageJson() {

    // meant to be called in a package directory
    const packageJsonPath = path.resolve(distDirectory, 'package.json');
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}