export interface WebComponentImpl<WC> extends Function {
    new(...args: any[]): WC;
}