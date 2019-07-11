const IGNORED_FILES = [
    '/package.tpl.json'
];

export const ignoreFile = (fileName: string): boolean => {
    if (!fileName) {
        return false;
    }
    return !!IGNORED_FILES.find((value: string) => fileName.endsWith(value));
};