import { st } from "../../../src/core";
import { share } from "../../../src/core/sharedmemory";
import { IPropChange } from "../../../src/core/state/interface";
import { attr, customElement } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { tsx } from "../../../src/web/vdom";

if (process.env.NODE_ENV === "development") {
  customElementsHMRPolyfill;
}

interface LolShared {
  lala: number;

  deep?: boolean;
}

@customElement("my-foo")
export class Foo extends st.element implements ILifecycle {
  @attr
  some: string = "test";

  @share("foo")
  lolShared: LolShared = st.initShare<LolShared>(
    "foo",
    { lala: 123 },
    (change: IPropChange) => {
      console.log("initShare on prime", this, change);
    },
    this,
  );

  @share("foo")
  lolSharedMirror: LolShared = st.getShare<LolShared>(
    "foo",
    (change: IPropChange) => {
      console.log("getShare on mirror", this, change);
    },
    this,
  );

  onAttributeChange(name: string, value: any) {
    console.log("@attr", name, "changed to", value);
  }

  constructor() {
    super();

    this.some = "haha";

    setTimeout(() => {
      st.info("di", st.di, "i18n");

      // external change (reset of reference)
      this.lolShared = { lala: 456 };

      // external deep change
      this.lolShared.deep = true;

      this.some = "haha_after_first_render";
    }, 200);

    setTimeout(() => {
      //document.body.removeChild(document.body.childNodes[0]);
    }, 800);

    setTimeout(() => {
      console.log("GC?");
    }, 10000);
  }

  onDisconnect() {
    console.log("onDisconnect");
  }
  render() {
    return <div>asd</div>;
  }

  renderStyle() {
    return {
      "@font-face": {
        "font-family": "CustomFont",
        src: 'url("CustomFont.eot")',
      },
      "@media (color-index: 16)": {
        body: {
          background: "#000000",
        },
      },
      body: {
        background: "#ff0000",
      },
    };
  }

  shouldRender() {
    return true;
  }
}

st.dom.setRoot("my-foo");
