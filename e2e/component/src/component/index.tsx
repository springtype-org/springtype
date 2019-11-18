// @ts-ignore JSON module import activated in bundler config
import { st } from "../../../../src/core";
import { ChangeDetector } from "../../../../src/core/cd";
import { context } from "../../../../src/core/context";
import { formatter, translation } from "../../../../src/core/i18n";
import { attr, component, state } from "../../../../src/web/component";
import { IStateChange } from "../../../../src/web/component/interface";
import { tsx } from "../../../../src/web/vdom";
// @ts-ignore JSON module import activated in bundler config
import * as de from "./i18n/de.json";
// @ts-ignore JSON module import activated in bundler config
import * as en from "./i18n/en.json";

@formatter("uppercase", value => value.toUpperCase())
@translation("de", de)
@translation("en", en)
@component
export class Foo2 extends st.component {
  @attr
  foo: string = "Jesus!!!";

  @attr
  foo2: boolean = false;

  @attr
  foo3: any = {
    huhu: {
      haha: 345,
    },
  };

  @context("foo")
  foo4: any = st.context("foo");

  @state
  lala: any = { a: "hase" };

  onStateChange(change: IStateChange) {
    console.log("state change", change);
  }

  onAttributeChange(name: string, value: any, prevValue: any) {
    console.log("ATTRIBUTE change", name, value, prevValue);
  }

  render() {
    console.log("render!");
    return (
      <div alt="asd2" unwrap>
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


    console.log('???foo3', this.foo3)

    setTimeout(() => {
      this.foo =
        "GOOOOOOOD" +
        st.t("deep222.msg", {
          someValue: "Yeah!",
        }) +
        st.t("deep.msg2", {
          someValue2: "Yeah!",
        }) +
        this.getAttribute("foo3");

      this.lala.a = "hase!";
      this.lala = "kabel";

      this.foo2 = true;

      this.foo3.huhu.haha = 999;

      console.log("foo3", this.getAttribute("foo3"));

      st.info("foo2", typeof this.foo2, this.foo2);

      console.log("reading context memory", this.foo4);
      this.foo4 = {};
      const x: any = st.context("foo");

      x.asd = true;

      console.log("get global x", x);

      const willAuchShareHaben = ChangeDetector.onChange(x, (path: string, value: any, prevValue: any) => {
        console.log("willAuchShareHaben", path, value, prevValue);
      });
      x.asd = false;

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
