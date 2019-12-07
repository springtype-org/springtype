import { Stream } from "../stream";

export type OperatorFunction<T> = (item: T, stream: Stream<T>) => Promise<T | undefined> | T | undefined;
