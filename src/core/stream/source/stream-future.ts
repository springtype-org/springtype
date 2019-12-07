import { Stream } from "../stream";

export const streamFuture = <T>(...streams: Array<Stream<T>>) => {
  const $ = new Stream<T>();
  for (let stream of streams) {
    stream.subscribeForFuture((item: T) => $.write(item));
  }
  return $;
}
