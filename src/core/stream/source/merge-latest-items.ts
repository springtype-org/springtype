
import { TYPE_UNDEFINED } from "../../lang/type-undefined";
import { JournalStream } from "../journal-stream";

export const streamMergeLatestItems = <T, T1, T2>(streamA$: JournalStream<T1>, streamB$: JournalStream<T2>, mergeFn: (itemA: T1, itemB: T2) => T): JournalStream<T> => {
  const $ = new JournalStream<T>();

  let latestItemOfA: any;
  let latestItemOfB: any;

  const onValue = () => {
    if (typeof latestItemOfA != TYPE_UNDEFINED && typeof latestItemOfB != TYPE_UNDEFINED) {
      $.write(mergeFn(latestItemOfA, latestItemOfB));
      latestItemOfA = undefined;
      latestItemOfB = undefined;
    }
  };

  streamA$.subscribeForPastAndFuture((item: any) => { latestItemOfA = item; onValue() });
  streamB$.subscribeForPastAndFuture((item: any) => { latestItemOfB = item; onValue() });

  return $;
}
