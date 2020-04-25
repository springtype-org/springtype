import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../src/web/vdom";
import * as mdcButton from "./styles.tss.scss";

@component
export class TemplateName extends st.component implements ILifecycle {

  tag = 'css-modules-support';

  label: string = "CSS modules are awesome!";

  render() {
    return (
      <fragment>
        {/* try auto-complete on the CSS module import */}
        <button
          class={[mdcButton.mdcButton, mdcButton.mdcButtonIcon, mdcButton.mdcButtonRipple]}
        >
          {this.label}
        </button>
      </fragment>
    );
  }
}

st.render(<TemplateName />);
