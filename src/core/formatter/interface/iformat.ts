import { IFormatValues } from "./iformat-values";

export type IFormat = (text: string, values: IFormatValues) => string;
