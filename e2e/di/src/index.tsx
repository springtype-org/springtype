import { Injectable, InjectionStrategy, st } from "../../../src/core";
import { Inject } from "../../../src/core/di/decorator/Inject";
import { CustomElement } from "../../../src/web/customelement";
import { SpringElement } from "../../../src/web/customelement/SpringElement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

// test injectable classes

@Injectable()
class FooSingleton {
	isSingleton: boolean = true;
}

@Injectable(InjectionStrategy.FACTORY)
class FooFactory {
	constructor(public name: string) {}
}

@Injectable(InjectionStrategy.FACTORY, () => new FooFactoryFunction("factory"))
class FooFactoryFunction extends FooFactory {}

// --- customElement test

@CustomElement("di-e2e")
export class DIE2E extends SpringElement {
	@Inject(FooSingleton)
	fooSingleton!: FooSingleton;

	@Inject(FooFactory)
	fooFactory!: FooFactory;

	@Inject(FooFactoryFunction)
	fooFactoryFunction!: FooFactoryFunction;

	constructor() {
		super();
	}

	onConnect() {
		// @ts-ignore: way to keep the TS compiler friendly
		if (this.fooSingleton === st.di.get(FooSingleton)) {
			console.log("singleton inject OK");
		}

		if (this.fooFactory && !this.fooFactory.name) {
			console.log("factory inject OK");
		}

		if (this.fooFactoryFunction && this.fooFactoryFunction.name == "factory") {
			console.log("factory function inject OK");
		}
	}
}

document.body.innerHTML = "<di-e2e></di-e2e>";
