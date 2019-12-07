import { JournalStream } from "../journal-stream";

export const streamValue = <T>(value: T) => {
  const $ = new JournalStream<T>();
  $.write(value);
  return $;
}
