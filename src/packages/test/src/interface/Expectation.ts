export interface Expectation {
    // what it has to return exactly
    returns?: any;

    // message or constructor type
    throws?: Function|string; // what it shall throw

    // custom return value test condition function
    test?: (returnValue: any, originalParams: Array<any>) => boolean;

    // max. amount of execution time to take in ms
    returnsWithin?: number;
}
