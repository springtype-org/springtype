export class SynchronouslyExecutedAsyncOperationPipeline {

    operations: Array<Function> = [];
    operationRunning: boolean = false;
    runnerInterval: any;

    // TODO: Implement debounceTime (execute most recent operation, evict queued ones) to prevent 2x-render
    constructor(protected runnerIntervalTime: number = 1,
                protected debounceTime: number = 0) {

    }

    private startQueueRunner() {

        if (!this.runnerInterval) {
            this.runnerInterval = setInterval(() => {

                if (!this.operationRunning) {

                    const operation = this.operations.shift();

                    if (operation) {
                        this.runOperation(operation);
                    } else {
                        clearInterval(this.runnerInterval);
                        delete this.runnerInterval;
                    }
                }
            }, this.runnerIntervalTime);
        }
    }

    private runOperation(operation: Function) {

        this.operationRunning = true;
        operation();
        this.operationRunning = false;
    }

    queue(operation: Function): Promise<void> {

        return new Promise((resolve) => {

            const promisedOperation = () => {
                resolve(operation());
            };

            if (this.operationRunning) {
                this.operations.push(promisedOperation);
                this.startQueueRunner();
            } else {
                this.runOperation(promisedOperation);
            }
        });
    }
}