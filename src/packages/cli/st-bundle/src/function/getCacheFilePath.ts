export const getCacheFilePath = (sourceFilePath: string): string => {

    let folders = sourceFilePath.split('/');

    // prepend .cache folder name
    folders.unshift('.cache');
    
    return folders.join('/');
};