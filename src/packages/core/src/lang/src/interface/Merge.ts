import {Omit} from "./Omit";

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;