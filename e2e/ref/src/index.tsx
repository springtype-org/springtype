import { st } from "../../../src/core";
import { component, attr } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { ref } from "../../../src/core/ref/decorator";

export interface IRedBoxAttrs {
  foo?: number;
}

@component
export class RedBox extends st.component<IRedBoxAttrs> {
  @attr
  foo!: number;

  makeRed = () => {
    console.log("makeRed", this.foo, this.el.style);

    this.style = {
      display: "block",
      backgroundColor: "red",
    };
  };

  render() {
    return <div>Works well if by background becomes red on click</div>;
  }
}

export interface IRefTestAttrs {
  someDiv?: HTMLDivElement;
  redBox?: RedBox;
}

@component
export class RefTest extends st.component<IRefTestAttrs> implements ILifecycle {

  protected time!: number;

  @ref
  someDiv!: HTMLDivElement;

  @ref
  redBox!: RedBox;

  onGetDiv = () => {
    console.log("get div", this.someDiv, this.redBox);

    this.time = Date.now();

    this.doRender();

    this.redBox.makeRed();
  };

  render() {
    console.log("rendering reftest...");

    return (
      <div>
        <RedBox style={{ color: "#0000ff" }} foo={345} ref={{ redBox: this }} />
        <button onClick={this.onGetDiv}>Get DIV</button>
        <div ref={{ someDiv: this }}>{this.time}</div>
      </div>
    );
  }

  onAfterInitialRender() {
    console.log('onAfterInitialRender', this.redBox)
  }

  onAfterRefChange(refName: string, refValue: any) {
    console.log('onAfterRefChange', refName, refValue);
  }
}

@component
export class Ref extends st.component {

  @attr
  showRefTest: boolean = true;

  render() {
    setTimeout(() => {
      this.showRefTest = !this.showRefTest;
    }, 10000);

    if (this.showRefTest) {
      return (
        <RefTest />
      );
    } else {
      return <div>Refresh test</div>;
    }
  }
}

st.render(<Ref />);
