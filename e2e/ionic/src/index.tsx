import "../../../ionic/integrate";
import { st } from "../../../src/core";
import { customElement } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { tsx } from "../../../src/web/vdom";

if (process.env.NODE_ENV === "development") {
  customElementsHMRPolyfill;
}

@customElement("st-ionic-app", {
  shadowMode: "none",
})
export class IonicApp extends st.element implements ILifecycle {
  render() {
    return (
      <ion-button>
        <ion-icon slot="icon-only" name="star"></ion-icon>
      </ion-button>
    );
  }
}

st.render(IonicApp);
