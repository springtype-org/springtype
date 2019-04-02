export interface TestCaseRunner {
    before?(): void;
    runTestCases(): void;
    after?(): void;
}