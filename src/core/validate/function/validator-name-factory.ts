export const VALIDATOR_NAME = 'VALIDATOR_NAME';

export const validatorNameFactory = (validationFunction: any, validatorName: string) => {
    validationFunction[VALIDATOR_NAME] = validatorName;
    return validationFunction;
};
