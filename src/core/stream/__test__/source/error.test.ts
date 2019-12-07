import { stream } from "../../source/stream";

describe("error", () => {

  it('calls the onError method when an error happens in a pipe', async () => {

    const errorHandler = jest.fn();
    const subscriber = jest.fn();

    const $1 = stream<number>().pipe(() => {
      throw new Error('Snap!');
      return 1;
    }).onError(errorHandler);

    $1.subscribeForPastAndFuture(subscriber);
    await $1.write(599);

    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledTimes(1);
    expect(subscriber).toHaveBeenCalledWith(599);
  });
});
