import { JournalStream } from "../journal-stream";

export const streamItems = <T>(items: Array<T> | T) => {
  const $ = new JournalStream<T>();
  if (Array.isArray(items)) {
    for (let item of items) {
      $.write(item);
    }
  } else {
    for (let key in items as any) {
      $.write((items as any)[key]);
    }
  }
  return $;
}
