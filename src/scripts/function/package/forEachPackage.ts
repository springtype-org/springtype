import {getFilteredPackages} from "./getFilteredPackages";

export async function forEachPackage(cb: (packageName: string) => void, filter: string) {

    const packages = getFilteredPackages(filter);

    // loop thru all packages and build
    for (let i=0; i<packages.length; i++) {
        await cb(packages[i]);
    }
}