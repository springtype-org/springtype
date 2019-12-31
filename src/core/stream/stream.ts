import { SubscribeFunction } from "./interface/isubscribe-function";
import { OperatorFunction } from "./interface/ioperator-function";
import { TYPE_FUNCTION } from "../lang/type-function";
import { TYPE_UNDEFINED } from "../lang/type-undefined";

export class Stream<T = {}> {

  protected subscribers: Array<SubscribeFunction<T>> = [];
  protected operators: Array<OperatorFunction<T>> = [];

  _onSubscribersCalled!: Function;
  _onError: Function = () => { };

  isCompleted: boolean = false;
  subscribeOnlyWhenCompleted: boolean = false;

  pipe = (...operators: Array<OperatorFunction<T>>) => {
    this.operators.push(...operators);
    return this;
  }

  write = async (item: T) => {
    this.callOperatorsAndSubsribers(item);
    return this;
  }

  callOperatorsAndSubsribers = async (item: T) => {

    for (let operator of this.operators) {
      if (typeof item == TYPE_UNDEFINED) continue;
      try {
        item = (await operator(item, this))!;
      } catch (e) {
        this._onError(e);
      }
    }
    this.notifySubscribers(item);
  }

  writeAndReturn = async (item: T) => {
    this.write(item);
    return item;
  }

  notifySubscribers = async (item: T | undefined) => {
    if (this.subscribeOnlyWhenCompleted && !this.isCompleted) return;

    for (let subscribeFunction of this.subscribers) {
      if (typeof subscribeFunction == TYPE_FUNCTION && typeof item != TYPE_UNDEFINED) {
        try {
          await subscribeFunction(item!);
        } catch (e) {
          this._onError(e);
        }
      }
    }
    this.onNotifySubscribers();
  }

  onNotifySubscribers = () => {
    if (typeof this._onSubscribersCalled === TYPE_FUNCTION) {
      this._onSubscribersCalled();
    }
  };

  subscribersCalled = async () => {
    return new Promise((resolve) => {
      this._onSubscribersCalled = resolve;
    });
  }

  subscribeForFuture = (...subscribeFunctions: Array<SubscribeFunction<T>>): Function => {
    this.subscribers.push(...subscribeFunctions);
    return () => {
      if (Array.isArray(subscribeFunctions)) {
        for (let subscribeFunction of subscribeFunctions) {
          this.unsubscribe(subscribeFunction);
        }
      } else {
        this.unsubscribe(subscribeFunctions);
      }
    };
  }

  unsubscribe = (subscribeFunction: SubscribeFunction<T>) => {
    delete this.subscribers[this.subscribers.indexOf(subscribeFunction)];
    return this;
  }

  destroy() {
    this.subscribers = [];
    this.operators = [];
  }

  setCompleted() {
    this.isCompleted = true;
    return this;
  }

  waitUntilCompleted() {
    this.subscribeOnlyWhenCompleted = true;
    return this;
  }

  // TODO: onThrow
  onError(errorCb: Function) {
    this._onError = errorCb;
    return this;
  }

  // merging

  mergeFuture = (...streams: Array<Stream<T>>) => {
    for (let stream of streams) {
      stream.subscribeForFuture((item: T) => this.write(item));
    }
    return this;
  }
}
