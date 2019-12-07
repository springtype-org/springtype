import { SubscribeFunction } from "./interface/isubscribe-function";
import { StatefulStream } from "./stateful-stream";

export class JournalStream<T = {}> extends StatefulStream<T> {

  persistState = (item: T) => {
    this.items.push(item);
  }

  subscribeForPastRangeAndFuture = (startIndex: number, endIndex: number, ...subscribeFunctions: Array<SubscribeFunction<T>>): Function => {
    const unsubscribeFn = this.subscribeForFuture(...subscribeFunctions);
    for (let i = startIndex; i < endIndex; i++) {
      this.notifySubscribers(this.items[i]);
    }
    return unsubscribeFn;
  }

  subscribeForPastAndFuture = (...subscribeFunctions: Array<SubscribeFunction<T>>): Function => {
    const unsubscribeFn = this.subscribeForFuture(...subscribeFunctions);
    for (let item of this.items) {
      this.notifySubscribers(item)
    }
    return unsubscribeFn;
  }

  // merging

  mergePastAndFuture = (...streams: Array<JournalStream<T>>) => {
    for (let stream of streams) {
      stream.subscribeForPastAndFuture((item: T) => this.write(item));
    }
    return this;
  }
}
