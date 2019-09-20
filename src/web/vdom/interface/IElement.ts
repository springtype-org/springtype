import { ILifecycle } from "../../customelement";

export interface IElement extends HTMLElement, ILifecycle {
	"data-vdom-ignore": boolean;
}
