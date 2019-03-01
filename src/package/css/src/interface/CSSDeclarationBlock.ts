
export type CSSColor = 'red' | 'green' | 'black';

export interface CSSDeclarationBlock {
    padding?: string|number;
    margin?: string|number;
    color?: CSSColor | string;
    backgroundColor?: CSSColor | string;
}