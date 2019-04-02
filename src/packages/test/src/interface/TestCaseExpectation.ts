import {Expectation} from "./Expectation";

export interface TestCaseExpectation extends Expectation {
    method?: Function|string;
    name?: string;
    params?: Array<any>;
}