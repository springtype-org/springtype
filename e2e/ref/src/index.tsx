import { st } from "../../../src/core";
import { customElement } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { css } from "../../../src/web/tss";
import { domRef, tsx } from "../../../src/web/vdom";


@customElement()
export class RefTest extends st.element implements ILifecycle {
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
        background: #cc0000
      }
    `
  }
}

st.render(<RefTest />);
