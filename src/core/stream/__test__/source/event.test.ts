import { streamEvent } from "../../source/event";

describe("event", () => {

  it('streams a DOM event', async() => {

    const subsciber = jest.fn();

    const btn = document.createElement('button');

    const click$ = streamEvent<MouseEvent>(btn, 'click');

    btn.click();
    btn.click();

    click$.subscribeForPastAndFuture(subsciber);

    await click$.subscribersCalled();

    expect(subsciber).toHaveBeenCalledTimes(2);
  });
});
