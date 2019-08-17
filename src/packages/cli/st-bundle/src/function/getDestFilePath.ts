export const getDestFilePath = (sourceFilePath: string): string => {

    let folders = sourceFilePath.split('/');

    // prepend 'dist' folder name
    folders.unshift('dist');

    return folders.join('/');
};