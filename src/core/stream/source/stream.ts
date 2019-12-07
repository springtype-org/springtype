import { JournalStream } from "../journal-stream"

export const stream = <T>() => {
  return new JournalStream<T>();
}
