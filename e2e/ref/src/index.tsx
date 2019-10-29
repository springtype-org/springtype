import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { css } from "../../../src/web/tss";
import { domRef, tsx } from "../../../src/web/vdom";

@component()
export class RefTest extends st.component implements ILifecycle {
  time: number = 0;

  @domRef("someDiv")
  someDiv!: HTMLDivElement;

  onGetDiv = () => {
    console.log("get div", st.getDomRef("someDiv", this), this.someDiv);

    this.time = Date.now();

    this.doRender();
  };

  render() {
    return (
      <div>
        <button onClick={this.onGetDiv}>Get DIV</button>
        <div ref={{ someDiv: this }}>{this.time}</div>
      </div>
    );
  }

  renderStyle() {
    return css`
      div {
        background: #cc0000;
      }
    `;
  }
}

st.render(<RefTest />);
