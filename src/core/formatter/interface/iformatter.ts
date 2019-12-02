import { IFormatters } from "./iformatters";
import { IAddFomratter } from "./iadd-formatter";
import { IFormat } from "./iformat";

export interface IFormatter {
	valueInterpolationRegexp: RegExp;
	formatters: IFormatters;
	addFormatter: IAddFomratter
	format: IFormat;
}
