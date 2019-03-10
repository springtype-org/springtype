export interface ComponentImpl<T> extends Function {
    new(...args: any[]): T;
}