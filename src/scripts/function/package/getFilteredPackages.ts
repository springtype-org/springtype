import {packages} from "../../definition/packages";

export function getFilteredPackages(filter: string) {

    let filteredPackages = packages;

    if (filter !== 'all') {
        filteredPackages = packages.filter(packageName => packageName === filter);
    }
    return filteredPackages;
}