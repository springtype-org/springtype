import {
	ICustomElementInstances,
	ICustomHTMLElement
} from "../../../web/customelement/interface";
import { IRouter } from "../../../web/router/interface";
import { ITSS } from "../../../web/tss/interface";
import {
	IDOM,
	IGetDomRef,
	IRenderer,
	ISetDomRef,
	IVirtualChildren,
	IVirtualNode,
	IVirtualNodeType
} from "../../../web/vdom/interface";
import {
	IOnChangeHandler,
	IOnDeepChangeHandler,
	IOnPropChangeHandler
} from "../../cd/interface";
import { IDI } from "../../di/interface";
import { Ii18n, It } from "../../i18n/interface";
import { ilogFunction } from "../../log/interface";
import { ISharedMemoryEntries } from "../../sharedmemory/interface";

/**
 * public $st and internal st API
 */
export interface i$st {
	// DOM routing
	router: IRouter;

	// dependency injection
	di: IDI;

	// internationalization (i18n), translation
	i18n: Ii18n;
	t: It;

	// TSS stylesheet renderer and theme / <style> template manager
	tss: ITSS;

	// TSX transformator function
	tsx: (
		type: IVirtualNodeType,
		attributes:
			| JSX.HTMLAttributes & JSX.SVGAttributes & Record<string, any>
			| null,
		...children: IVirtualChildren[]
	) => IVirtualNode<any>;

	// DOM mutation abstraction
	dom: IDOM;

	// initial and patch (differential) rendering
	renderer: IRenderer;

	// change detection for objects and arrays (deep changes)
	onChange: (object: any, onChange: IOnDeepChangeHandler, options: any) => any;

	// change detection with support for (deep changes + reference set changes)
	onPropChange: (
		instance: any,
		name: string | symbol,
		onChange: IOnChangeHandler,
		onDeepChange?: IOnDeepChangeHandler
	) => any;

	// set and get DOM references from within @customElement classes using @ref
	getDomRef: IGetDomRef;
	setDomRef: ISetDomRef;

	// custom element base class implemenetation to inherit from
	customElement: ICustomHTMLElement;

	// logging
	log: ilogFunction;
	info: ilogFunction;
	warn: ilogFunction;
	error: ilogFunction;

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

	addShareChangeHandler: (
		shareName: string,
		onChange: IOnPropChangeHandler,
		instance?: any
	) => void;

	removeShareChangeHandler: (
		sharedName: string,
		onChange?: IOnPropChangeHandler
	) => void;

	SHARED_MEMORY: ISharedMemoryEntries;
	CUSTOM_ELEMENT_INSTANCES: ICustomElementInstances;

	// registries like: CUSTOM_ELEMENT_INSTANCES, SHARED_MEMORY, etc.
	[registryName: string]: any;
}
