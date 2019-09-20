export interface IStateValues {
    [key: string]: string|number|boolean|Date|IStateValues;
}