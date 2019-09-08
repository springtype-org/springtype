const OBSERVED_ATTRIBUTES = 'OBSERVED_FIELD';

export interface ObservedField {
    name: string | symbol
}

export const setObservedFields = (prototype: any, observedFields: ObservedField[]) =>
    Reflect.set(prototype, OBSERVED_ATTRIBUTES, observedFields) || [];

export const getObservedFields = (prototype: any): ObservedField[] => Reflect.get(prototype, OBSERVED_ATTRIBUTES) || [];

export const isFieldObserved = (observedFields: ObservedField[], attributeName: string | symbol): boolean => {
    return !!observedFields.find((observedField: ObservedField) => observedField.name == attributeName);
};