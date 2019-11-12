import { st } from "../../../src/core";
import { component, state } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface/ilifecycle";
import { domRef, tsx } from "../../../src/web/vdom";
import * as mdcButton from "./styles.tss.scss";

@component()
export class TemplateName extends st.component implements ILifecycle {
  @state
  label: string = "Click me!";

  @domRef("nameDiv")
  nameDiv!: HTMLDivElement;

  changeName = (evt: MouseEvent) => {
    this.label = "Click me again!";
  };

  render() {
    return (
      <div ref={{ nameDiv: this }}>
        <button
          class={[mdcButton.mdcButton, mdcButton.mdcButtonIcon, mdcButton.mdcButtonRipple]}
          style={{ background: "#eee", border: "1px dotted green" }}
          onClick={this.changeName}>
          {this.label}
        </button>
      </div>
    );
  }
}

st.render(<TemplateName />);
