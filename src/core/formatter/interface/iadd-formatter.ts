import { IFormatter } from "./iformatter";
import { IFormatterFunction } from "./iformatter-function";

export type IAddFomratter = (identifier: string, formatter: IFormatterFunction) => IFormatter;
