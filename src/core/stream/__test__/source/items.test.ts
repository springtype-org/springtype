import { streamItems } from "../../source/items";

describe("items", () => {

  it('streams items such as items of an array', (cb: Function) => {

    let call = 0;
    const subscriber = jest.fn((item: any) => {
      call++;

      switch (call) {
        case 1:
          expect(item).toEqual('a');
          break;
        case 2:
          expect(item).toEqual('b');
          cb();
          break;
      }
    });

    const $1 = streamItems<Array<string>>(['a', 'b']);

    $1.subscribeForPastAndFuture(subscriber);

    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('streams many values such as an object', (cb: Function) => {

    let call = 0;
    const subscriber = jest.fn((item: any) => {
      call++;

      switch (call) {
        case 1:
          expect(item).toEqual(2);
          break;
        case 2:
          expect(item).toEqual(5);
          cb();
          break;
      }
    });

    const $1 = streamItems<{ [key: string]: number }>({
      'aron': 2,
      'mansi': 5
    });

    $1.subscribeForPastAndFuture(subscriber);

    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
