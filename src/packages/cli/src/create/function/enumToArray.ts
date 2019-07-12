export const enumToArray = (enumme: any) => {
    return Object.keys(enumme)
        .map(key => enumme[key]);
};