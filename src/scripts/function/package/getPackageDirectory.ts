import {getPackagesDirectory} from "./getPackagesDirectory";

const path = require('path');

export function getPackageDirectory(packageName: string) {
    return path.resolve(getPackagesDirectory(), packageName);
}