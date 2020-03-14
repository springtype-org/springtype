export interface IForm {
    debounceTimeInMs: number;
    validationStrategies: Array<string>;
    labelActiveClasses: Array<string>,
    invalidClasses: Array<string>,
    validClasses: Array<string>
}