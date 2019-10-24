import { st } from "../../../src/core";
import { attr, customElement } from "../../../src/web/customelement";
import { tsx } from "../../../src/web/vdom";

@customElement()
export class E2EChildren extends st.element {

  @attr()
  mapofnames = ["Rene"];

  constructor() {
    super();
    setTimeout(() => {
      this.mapofnames = ["Michael", "Aron", "Daniel", "Bernd", "Holger"];
    }, 500);
  }

  render() {
    return (
      <div id="e2e-children">
        {this.mapofnames.map(value => (
          <p class="name">{value}</p>
        ))}
        Waiting...
      </div>
    );
  }
}

st.render(<E2EChildren />);
