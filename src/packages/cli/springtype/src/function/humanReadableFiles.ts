const PROGRAM_CODE_FILE_EXTENSIONS = [
    '.tsx',
    '.ts',
    '.html',
    '.css',
    '.json'
];

export const isProgramCodeFile = (fileName: string): boolean => {
    if (!fileName) {
        return false;
    }
    return !!PROGRAM_CODE_FILE_EXTENSIONS.find((value: string) => fileName.endsWith(value));
};