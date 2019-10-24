import { st } from "../../../../src/core";
import { customElement } from "../../../../src/web/customelement";
import { ILifecycle } from "../../../../src/web/customelement/interface";
import { tsx } from "../../../../src/web/vdom";

@customElement()
export class E2ENonSlotted extends st.element implements ILifecycle {

  render() {
    return <p>
      Custom element without any slot tag. No content should leak here.
    </p>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "E2ENonSlotted": Partial<E2ENonSlotted>;

      // this is only necessary for demonstration of the 1:1 e2e test case
      "e2enonslotted": Partial<E2ENonSlotted>;
    }
  }
}
