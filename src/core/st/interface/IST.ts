import { IRouter } from "../../../web/router/interface/IRouter";
import { ITSS } from "../../../web/tss/interface/ITSS";
import { IGetDomRef, ISetDomRef } from "../../../web/vdom/interface/IDOMRef";
import { IDI } from "../../di/interface/IDI";
import { Ii18n } from "../../i18n/interface/Ii18n";

export interface IST {
	router: IRouter;

	di: IDI;

	i18n: Ii18n;

	tss: ITSS;

	// TODO:
	// dom
	// renderer
	// log
	// warn
	// error
	// info
	// onChange
	// applyChangeDetection -> rename onPropChange
	// initShare
	// getShare
	// removeChangeHandler -> rename: removeShareChangeHandler
	// addShareChangeHandler
	// vdom
	// state

	getRef: IGetDomRef;
	setRef: ISetDomRef;

	// e.g. [Symbol(SHARED_MEMORY), Symbol(CUSTOM_ELEMENT_INSTANCES)]
	[libraryGlobalName: string]: any;
}
