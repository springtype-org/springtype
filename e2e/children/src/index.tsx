import { st } from "../../../src/core";
import { attr, component } from "../../../src/web/component";
import { tsx } from "../../../src/web/vdom";

@component
export class E2eChildren extends st.component {

  @attr
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

st.render(<E2eChildren />);
