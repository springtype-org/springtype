import { IInjectable, Injectable, InjectionStrategy } from "../../core";

@Injectable(InjectionStrategy.FACTORY)
export class Lifecycle implements IInjectable {
	_context: any;

	onContextChange(context: any) {
		this._context = context;
	}

	render() {
		this._context.render();
	}
}
