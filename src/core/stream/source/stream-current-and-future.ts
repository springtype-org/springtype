import { StatefulStream } from "../stateful-stream";

export const streamCurrentAndFuture = <T>(...streams: Array<StatefulStream<T>>) => {
  const $ = new StatefulStream<T>();
  for (let stream of streams) {
    stream.subscribeForCurrentAndFuture((item: T) => $.write(item));
  }
  return $;
}
