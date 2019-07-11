const HUMAN_READABLE_FILE_EXTENSIONS = [
    '.tsx',
    '.ts',
    '.html',
    '.css',
    '.json'
];

export const isHumanReadableFile = (fileName: string): boolean => {
    if (!fileName) {
        return false;
    }
    return !!HUMAN_READABLE_FILE_EXTENSIONS.find((value: string) => fileName.endsWith(value));
};