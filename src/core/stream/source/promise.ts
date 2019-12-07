import { JournalStream } from "../journal-stream";

export const streamPromise = <T>(promise: Promise<T>) => {
  const $ = new JournalStream<T>();
  (async () => { $.write(await promise) })();
  return $;
}
