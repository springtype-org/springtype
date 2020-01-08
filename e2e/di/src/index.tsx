import { st } from "../../../src/core";
import { inject, injectable } from "../../../src/core/di";
import { InjectionStrategy } from "../../../src/core/di/enum";

// test injectable classes

@injectable
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

	@inject(FooFactory, "firstCtorArgumentProvided")
	fooFactoryCtorArg!: FooFactory;

	@inject(FooFactoryFunction)
	fooFactoryFunction!: FooFactoryFunction;

	constructor() {

		// @ts-ignore: way to keep the TS compiler friendly
		if (this.fooSingleton === st.di.get(FooSingleton)) {
			st.log("singleton inject OK");
		}

		if (this.fooFactory && !this.fooFactory.name) {
			st.log("factory inject OK");
		}

		if (this.fooFactoryFunction && this.fooFactoryFunction.name == "factory") {
			st.log("factory function inject OK");
		}

		if (this.fooFactoryCtorArg && this.fooFactoryCtorArg.name == "firstCtorArgumentProvided") {
			st.log("factory function constructor argument passing OK");
		}
		st.log(this.fooSingleton, this.fooFactory, this.fooFactoryCtorArg);
	}
}

new DIE2E();
