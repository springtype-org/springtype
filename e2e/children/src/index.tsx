import { st } from "../../../src/core";
import { attr, customElement } from "../../../src/web/customelement";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { tsx } from "../../../src/web/vdom";

if (process.env.NODE_ENV === "development") {
  customElementsHMRPolyfill;
}

@customElement("e2e-children", { shadowMode: "none" })
export class Foo extends st.element {
  @attr
  mapofnames = ["Rene"];
  constructor() {
    super();
    setTimeout(() => {
      this.mapofnames = ["Michael", "Aron", "Daniel", "Bernd", "Holger"];
    }, 1500);
  }

  render() {
    return (
      <div>
        {this.mapofnames.map(value => (
          <p class="name">{value}</p>
        ))}
        Waiting...
      </div>
    );
  }
}

document.body.innerHTML = "<e2e-children></e2e-children>";
