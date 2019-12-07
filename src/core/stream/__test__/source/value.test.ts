import { streamValue } from "../../source/value";

describe("value", () => {

  it('streams a value', (cb: Function) => {

    const subscriber = jest.fn();

    const $1 = streamValue<string>('Bar');

    $1.subscribeForPastAndFuture(subscriber);

    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith('Bar');
    cb();
  });
});
