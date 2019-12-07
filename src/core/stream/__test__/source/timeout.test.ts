import { streamTimeout } from "../../source/timeout";

describe("timeout", () => {

  it('streams a value of a timeout callback execution', (cb: Function) => {

    const startTime = Date.now();

    const $1 = streamTimeout<string>(() => {
      return "Foo!"
    }, 300);

    $1.subscribeForPastAndFuture((promiseResult: string) => {
      const diffTime = Date.now() - startTime;
      expect(diffTime).toBeGreaterThanOrEqual(300);
      expect(promiseResult).toEqual('Foo!');
      cb();
    })
  });
});
