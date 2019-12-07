import { streamInterval } from "../../source/interval";

describe("interval", () => {

  it('streams a value of a interval callback execution', (cb: Function) => {

    const subscriber = jest.fn();

    const $1 = streamInterval<string>(() => {
      return "Foo!"
    }, 100);

    $1.subscribeForPastAndFuture(subscriber);

    setTimeout(() => {
      expect(subscriber).toHaveBeenCalledTimes(3);
      cb();
    }, 350)
  });
});
