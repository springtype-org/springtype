import {packagesBasePath} from "../../definition/packagesBasePath";
import {getAbsoluteCwd} from "../system/getAbsoluteCwd";
const path = require('path');

export function getPackagesDirectory() {
    return path.resolve(getAbsoluteCwd(), packagesBasePath);
}