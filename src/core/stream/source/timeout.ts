import { JournalStream } from "../journal-stream";

export const streamTimeout = <T = {}>(fn: () => T, ms: number): JournalStream<T> => {
  const $ = new JournalStream<T>();
  setTimeout(() => {
    $.write(fn());
  }, ms);
  return $;
}
