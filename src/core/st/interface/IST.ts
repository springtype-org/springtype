import { IRouter } from "../../../web/router/interface/IRouter";
import { ITSS } from "../../../web/tss/interface/ITSS";
import { IGetDomRef, ISetDomRef } from "../../../web/vdom/interface/IDOMRef";
import { IOnPropChangeHandler } from "../../cd/interface/IOnPropChange";
import { IDI } from "../../di/interface/IDI";
import { Ii18n, It } from "../../i18n/interface/Ii18n";

export interface IST {
	router: IRouter;

	di: IDI;

	// translate
	i18n: Ii18n;
	t: It;

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

	// set and get DOM references from within @customElement classes using @ref
	getDomRef: IGetDomRef;
	setDomRef: ISetDomRef;

	// custom element base class implemenetation to inherit from
	customElement: any; // typeof CustomHTMLElement TODO: Interface otherwise it imports!

	// logging
	log: (...args: Array<any>) => void;
	info: (...args: Array<any>) => void;
	warn: (...args: Array<any>) => void;
	error: (...args: Array<any>) => void;

	// shared memory
	getShare<S = {}>(
		shareName: string,
		onChange?: IOnPropChangeHandler,
		instance?: any
	): S;

	initShare<S = {}>(
		shareName: string,
		initialValue: S,
		onChange?: IOnPropChangeHandler,
		instance?: any
	): S;

	// e.g. [Symbol(SHARED_MEMORY), Symbol(CUSTOM_ELEMENT_INSTANCES)]
	[libraryGlobalName: string]: any;
}
