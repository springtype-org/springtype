import { ILifecycle } from "../../customelement/interface";

export interface IElement extends HTMLElement, ILifecycle {
	"data-vdom-ignore": boolean;
}
