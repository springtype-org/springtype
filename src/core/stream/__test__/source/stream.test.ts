import { OperatorFunction } from "../../interface/ioperator-function";
import { stream } from "../../source/stream";
import { JournalStream } from "../../journal-stream";

interface User {
  id: number;
  firstName: string;
  isPhantom?: boolean;
}

describe("stream", () => {

  const makePhantomOperator: OperatorFunction<User> = async (user: User) => {
    user.isPhantom = true;
    return user;
  }

  it('creates a JournalStream', () => {
    const $1 = stream<User>();
    expect($1).toBeInstanceOf(JournalStream);
  });

  it('streams the past and the future', async () => {

    const $1 = stream<User>()
      .pipe((user: User) => { user.firstName = user.firstName.toLowerCase(); return user; })

    await $1.write({
      id: 5,
      firstName: 'Eron'
    })

    const $2 = stream<User>()
      .pipe((user: User) => { user.firstName = user.firstName.toUpperCase(); return user; })

    await $2.write({
      id: 6,
      firstName: 'Fron'
    });

    await $2.write({
      id: 7,
      firstName: 'Gron'
    });

    const $3 = stream<User>()
      .pipe(makePhantomOperator)
      .mergePastAndFuture($1, $2);

    await $2.write({
      id: 8,
      firstName: 'Hron'
    });

    await $3.write({
      id: 9,
      firstName: 'Mansi'
    });

    const eron = { id: 5, firstName: 'eron', isPhantom: true };
    const FRON = { id: 6, firstName: 'FRON', isPhantom: true };
    const GRON = { id: 7, firstName: 'GRON', isPhantom: true };
    const HRON = { id: 8, firstName: 'HRON', isPhantom: true };
    const Mansi = { id: 9, firstName: 'Mansi', isPhantom: true };
    let call = 0;

    $3.subscribeForPastAndFuture((user: User) => {

      call++;

      switch (call) {
        case 1:
          expect(user).toEqual(eron);
          break;

        case 2:
          expect(user).toEqual(FRON);
          break;

        case 3:
          expect(user).toEqual(GRON);
          break;

        case 4:
          expect(user).toEqual(HRON);
          break;

        case 5:
          expect(user).toEqual(Mansi);
          break;
      }
    });
  });
});
