import { IRouter } from "../../../web/router/interface/IRouter";
import { ITSS } from "../../../web/tss/interface/ITSS";
import { IDI } from "../../di/interface/IDI";
import { Ii18n } from "../../i18n/interface/Ii18n";

export interface IST {
	router: IRouter;

	di: IDI;

	i18n: Ii18n;

	tss: ITSS;

	// e.g. [Symbol(SHARED_MEMORY), Symbol(CUSTOM_ELEMENT_INSTANCES)]
	[libraryGlobalName: string]: any;
}
