import { streamPromise } from "../../source/promise";

describe("promise", () => {

  it('streams a promise', (cb: Function) => {

    const promise = new Promise<string>((resolve) => {
      setTimeout(() => { resolve('foo') }, 500);
    });

    const startTime = Date.now();

    const $1 = streamPromise<string>(promise);

    $1.subscribeForPastAndFuture((promiseResult: string) => {
      const diffTime = Date.now() - startTime;
      expect(diffTime).toBeGreaterThanOrEqual(300);
      expect(promiseResult).toEqual('foo');
      cb();
    })
  });
});
