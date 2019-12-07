import { stream } from "../../source/stream";
import { streamMergeLatestItems } from "../../source/merge-latest-items";

interface Group {
  id: number;
  name: string;
}

interface User {
  id: number;
  firstName: string;
}

interface UserGroup {
  user: User;
  group: Group;
}
describe("merge-latest", () => {

  it('merges events when both streams emit', (cb: Function) => {

    const startTime = Date.now();
    const $1 = stream<User>();
    const $2 = stream<Group>();
    const user = {
      id: 1,
      firstName: 'Mansi'
    };
    const group = {
      id: 1,
      name: 'Admin'
    }

    setTimeout(() => {
      $1.write(user)
    }, 100);


    setTimeout(() => {
      $2.write(group)
    }, 300);

    const $3 = streamMergeLatestItems<UserGroup, User, Group>($1, $2, (user: User, group: Group) => {
      return {
        user,
        group
      } as UserGroup;
    });

    $3.subscribeForPastAndFuture((userGroup: UserGroup) => {
      const diffTime = Date.now() - startTime;
      expect(diffTime).toBeGreaterThanOrEqual(300);
      expect(userGroup.user).toEqual(user);
      expect(userGroup.group).toEqual(group);
      cb();
    })
  });
});
