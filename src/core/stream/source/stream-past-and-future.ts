import { JournalStream } from "../journal-stream";

export const streamPastAndFuture = <T>(...streams: Array<JournalStream<T>>) => {
  const $ = new JournalStream<T>();
  for (let stream of streams) {
    stream.subscribeForPastAndFuture((item: T) => $.write(item));
  }
  return $;
}
