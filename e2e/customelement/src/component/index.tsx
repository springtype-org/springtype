import {
	ChangeDetector,
	Formatter,
	getShare,
	initShare,
	log,
	Prop,
	PropChange,
	Share,
	t,
	Translation
} from "../../../../src/core";
import { Attribute, CustomElement, tsx } from "../../../../src/web";
import { SpringElement } from "../../../../src/web/customelement/SpringElement";
// @ts-ignore JSON module import activated in bundler config
import * as de from "./i18n/de.json";
// @ts-ignore JSON module import activated in bundler config
import * as en from "./i18n/en.json";

@Formatter("uppercase", value => value.toUpperCase())
@Translation("de", de)
@Translation("en", en)
@CustomElement("my-foo2")
export class Foo2 extends SpringElement {
	@Attribute()
	foo: string = "Jesus!!!";

	@Attribute()
	foo2: boolean = false;

	@Attribute()
	foo3: any = {
		huhu: {
			haha: 345
		}
	};

	@Share("foo")
	foo4: any = initShare("foo", {});

	@Prop()
	lala: any = { a: "hase" };

	onPropChange(change: PropChange) {
		console.log("PROP change", change);
	}

	onAttributeChange(name: string, value: any, prevValue: any) {
		console.log("ATTRIBUTE change", name, value, prevValue);
	}

	render() {
		console.log("render!");
		return (
			<div alt="asd">
				<span>
					LALA
					<slot name="counter">default</slot>
					HUHU
					<div>
						<slot name="counter2">${this.foo}</slot>
					</div>
					FOO
				</span>
			</div>
		);
	}

	onConnect() {
		setTimeout(() => {
			this.foo =
				"GOOOOOOOD" +
				t("deep222.msg", {
					someValue: "Yeah!"
				}) +
				t("deep.msg2", {
					someValue2: "Yeah!"
				}) +
				this.getAttribute("foo3");

			this.lala.a = "hase!";
			this.lala = "kabel";

			this.foo2 = true;

			this.foo3.huhu.haha = 999;

			console.log("foo3", this.getAttribute("foo3"));

			log("foo2", typeof this.foo2, this.foo2);

			console.log("reading shared memory", this.foo4);
			this.foo4 = {};
			const x: any = getShare("foo");

			x.asd = true;

			console.log("get global x", x);

			const willAuchShareHaben = ChangeDetector.onChange(
				x,
				(path: string, value: any, prevValue: any) => {
					console.log("willAuchShareHaben", path, value, prevValue);
				}
			);

			this.foo4.test = "asdasd";
			this.foo4.test = "asdasd1";
			this.foo4.lala = 333;

			console.log("FINAL: ", x, willAuchShareHaben);
		}, 3000);
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"my-foo2": Partial<Foo2>;
		}
	}
}
