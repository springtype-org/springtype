import { JournalStream } from "../journal-stream";
import { TYPE_UNDEFINED } from "../../lang/type-undefined";

export const streamCombineLatestItems = <T>(streamA$: JournalStream<T>, streamB$: JournalStream<T>) => {
  const $ = new JournalStream<T>();

  let latestItemOfA: any;
  let latestItemOfB: any;

  const onValue = () => {
    if (typeof latestItemOfA != TYPE_UNDEFINED && typeof latestItemOfB != TYPE_UNDEFINED) {
      $.write(latestItemOfA);
      $.write(latestItemOfB);
      latestItemOfA = undefined;
      latestItemOfB = undefined;
    }
  };

  streamA$.subscribeForPastAndFuture((item: any) => { latestItemOfA = item; onValue() });
  streamB$.subscribeForPastAndFuture((item: any) => { latestItemOfB = item; onValue() });
  return $;
}
