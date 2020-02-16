export interface IAttrFormComponent extends Partial<HTMLFormElement> {
    name?: string;
    action?: string;
    activeLabelClasses?: Array<string>;
    invalidClasses?: Array<string>;
    validClasses?: Array<string>;
}