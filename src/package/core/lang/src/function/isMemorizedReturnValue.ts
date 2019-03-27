export const isMemorizedReturnValue = (value: any): boolean => {
    return Reflect.get(value, 'IS_MEMORIZED_RETURN_VALUE');
};