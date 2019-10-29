import { st } from "../../../src/core";
import { context } from "../../../src/core/context";
import { attr, component } from "../../../src/web/component";
import { Component } from "../../../src/web/component/component";
import { tsx } from "../../../src/web/vdom";
import { tpl } from "./index.tpl";
import { tss } from "./index.tss";

const attr_ = (scope: Component, name: string, defaultValue?: string, x?: any): string => {
  console.log("register for attribute cd", name);

  return defaultValue || "";
};

@component({
  tss
})
export class Foo extends st.component {
  @attr()
  some: string = attr_(this, "some", "test");

  @context("foo")
  lolShared: any = st.getContext("foo");

  onButtonClick = () => {
    this.doRender();
  };

  render() {
    console.log("render x");
    return tpl(this);
  }

  constructor() {
    super();

    this.some = "haha";

    console.log("foo st", st);

    st.i18n.setLanguage("en");

    setTimeout(() => {
      st.info("router", st.router, "di", st.di, "i18n", st.i18n, "tss", st.tss);
    }, 200);
  }

  onStateChange(change: any) {
    console.log("1PROP change", change);
  }

  onConnect(): boolean {
    st.info("to be executed on connect");
    //this.lifecycle.doRender();

    setTimeout(() => {
      this.some = "haha2";
      //this.lifecycle.render();
      st.info("re-render after attribute change");
    }, 1000);

    setTimeout(() => {
      console.log("after 5sec", this.lolShared);
      this.lolShared.lala = 2841823;

      console.log("FINAL1", this.lolShared);
    }, 5000);
    return true;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "Foo": Partial<Foo>;
    }
  }
}

st.render(<Foo />);
