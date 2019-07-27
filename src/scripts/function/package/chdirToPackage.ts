import {getPackageDirectory} from "./getPackageDirectory";
import {chdirSync} from "../system/chdirSync";
import {getRelativePath} from "../system/getRelativePath";

export function chdirToPackage(packageName: string) {
    chdirSync(getRelativePath(getPackageDirectory(packageName)));
}
