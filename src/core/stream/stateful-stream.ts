import { SubscribeFunction } from "./interface/isubscribe-function";
import { Stream } from "./stream";
import { TYPE_UNDEFINED } from "../lang/type-undefined";

export class StatefulStream<T = {}> extends Stream<T> {

  protected items: Array<T | undefined> = [];

  persistState = (item: T) => {
    this.items = [item];
  }

  getLatestItem = (): T | undefined => {
    return this.items[this.getItemCount() - 1];
  }

  getItemCount = (): number => this.items.length;

  write = async (...items: Array<T>) => {

    for (let item of items) {

      this.persistState(item);

      const latestIndex = this.items.length - 1;

      for (let operator of this.operators) {
        if (typeof this.items[latestIndex] != TYPE_UNDEFINED) {
          try {
            this.items[latestIndex] = await operator(this.items[latestIndex]!, this);
          } catch (e) {
            this._onError(e);
          }
        }
      }
      this.notifySubscribers(this.items[latestIndex]!);
    }
    return this;
  }

  writeAndReturn = async (item: T) => {
    this.write(item);
    return this.items[this.items.length - 1]!;
  }

  subscribeForCurrentAndFuture = (...subscribeFunctions: Array<SubscribeFunction<T>>): Function => {
    const unsubscribeFn = this.subscribeForFuture(...subscribeFunctions);
    const latestItem = this.getLatestItem();
    this.notifySubscribers(latestItem);
    return unsubscribeFn;
  }

  destroy() {
    super.destroy();
    this.items = [];
  }

  // merging

  mergeCurrentAndFuture = (...streams: Array<StatefulStream<T>>) => {
    for (let stream of streams) {
      stream.subscribeForCurrentAndFuture((item: T) => this.write(item));
    }
    return this;
  }
}
