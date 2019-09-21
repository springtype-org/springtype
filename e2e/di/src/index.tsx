import { st } from "../../../src/core";
import { inject, injectable, InjectionStrategy } from "../../../src/core/di";
import { customElement } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/customElementsHMRPolyfill";

if (process.env.NODE_ENV === "development") {
	customElementsHMRPolyfill;
}

// test injectable classes

@injectable()
class FooSingleton {
	isSingleton: boolean = true;
}

@injectable(InjectionStrategy.FACTORY)
class FooFactory {
	constructor(public name: string) {}
}

@injectable(InjectionStrategy.FACTORY, () => new FooFactoryFunction("factory"))
class FooFactoryFunction extends FooFactory {}

// --- customElement test

@customElement("di-e2e")
export class DIE2E extends st.customElement {
	@inject(FooSingleton)
	fooSingleton!: FooSingleton;

	@inject(FooFactory)
	fooFactory!: FooFactory;

	@inject(FooFactoryFunction)
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
