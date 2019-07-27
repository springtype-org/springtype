export function rewriteDistSubFolderReferences(packageJson: any) {

    delete packageJson['files'];

    if (packageJson['main']) {
        packageJson['main'] = packageJson['main'].replace('dist/', '');
    }

    if (packageJson['types']) {
        packageJson['types'] = packageJson['types'].replace('dist/', '');
    }

    if (packageJson['bin']) {

        for (let binName in packageJson['bin']) {

            if (packageJson['bin'].hasOwnProperty(binName)) {
                packageJson['bin'][binName] =  packageJson['bin'][binName].replace('dist/', '');
            }
        }
    }
    return packageJson;
}