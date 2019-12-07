import { JournalStream } from "../journal-stream";

export const streamInterval = <T = {}>(fn: () => T, ms: number): JournalStream<T> => {
  const $ = new JournalStream<T>();
  setInterval(() => {
    $.write(fn());
  }, ms);
  return $;
}
