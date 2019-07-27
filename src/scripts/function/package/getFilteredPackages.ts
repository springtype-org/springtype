import {packages} from "../../definition/packages";

export function getFilteredPackages(filter: string) {

    let filteredPackages = packages;

    // list of package names
    if (filter.indexOf(',') > -1) {

        let whitelistedPackages = filter.split(',');

        // only allow packages named, but preserve the right order (from packages array)
        filteredPackages = packages.filter(packageName => whitelistedPackages.indexOf(packageName) > -1);
    } else  if (filter !== 'all') {

        // filter for specific package
        filteredPackages = packages.filter(packageName => packageName === filter);
    }

    // case: all
    return filteredPackages;
}