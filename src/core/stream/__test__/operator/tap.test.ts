import { stream } from "../../source/stream";
import { tap } from "../../operator/tap";

interface User {
  id: number;
  firstName: string;
  isPhantom?: boolean;
}

describe("tap-operator", () => {

  it('tap operator returns exactly whats given to it', () => {

    const item = {
      firstName: 'Aron',
      id: 1
    };

    expect(tap(jest.fn())(item)).toEqual(item);
  });

  it('can tap and does not change anything', async () => {

    const tapIt = jest.fn();

    const item = {
      firstName: 'Aron',
      id: 1
    };

    const $1 = stream<User>()
      .pipe(
        (user: User) => { user.firstName = user.firstName.toLowerCase(); return user; },
        tap(tapIt)
      );

    await $1.write(item);

    $1.subscribeForPastAndFuture(jest.fn());

    await $1.subscribersCalled();

    expect(tapIt).toHaveBeenCalled();
  });
});
