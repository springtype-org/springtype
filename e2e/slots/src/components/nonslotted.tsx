import { st } from "../../../../src/core";
import { component } from "../../../../src/web/component";
import { ILifecycle } from "../../../../src/web/component/interface";
import { tsx } from "../../../../src/web/vdom";

@component
export class E2eNonSlotted extends st.component implements ILifecycle {

  render() {
    return <p>
      Custom element without any slot tag. No content should leak here.
    </p>;
  }
}
