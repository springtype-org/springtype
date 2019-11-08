import { st } from "../../../src/core";
import { inject, injectable } from "../../../src/core/di";
import { InjectionStrategy } from "../../../src/core/di/enum";

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

export class DIE2E {
	@inject(FooSingleton)
	fooSingleton!: FooSingleton;

	@inject(FooFactory)
	fooFactory!: FooFactory;

	@inject(FooFactoryFunction)
	fooFactoryFunction!: FooFactoryFunction;

	constructor() {

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

new DIE2E();
