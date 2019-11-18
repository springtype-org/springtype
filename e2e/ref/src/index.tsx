import { st } from "../../../src/core";
import { component, attr } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { ref } from "../../../src/core/ref/decorator";

@component
export class redbox extends st.component {
  @attr
  foo: number;

  makeRed = () => {
    console.log("makeRed", this.foo, this.el.style);

    this.elStyle = {
      display: "block",
      backgroundColor: "red",
    };
  };

  render() {
    return <div>Works well if I'm becoming red</div>;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      redbox: Partial<redbox>;
    }
  }
}

@component
export class reftest extends st.component implements ILifecycle {
  time: number = 0;

  @ref
  someDiv!: HTMLDivElement;

  @ref
  redBox!: redbox;

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
        <redbox style={{ color: "#ffffff" }} foo={345} ref={{ redBox: this }} />
        <button onClick={this.onGetDiv}>Get DIV</button>
        <div ref={{ someDiv: this }}>{this.time}</div>
      </div>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      reftest: Partial<reftest>;
    }
  }
}

@component
export class container extends st.component {
  showRefTest: boolean = true;

  render() {
    setTimeout(() => {
      this.showRefTest = !this.showRefTest;
      this.doRender();
    }, 1000);

    if (this.showRefTest) {
      return (
        <div>
          <reftest />
        </div>
      );
    } else {
      return <div>Refresh test</div>;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      container: Partial<container>;
    }
  }
}

st.render(<container />);
