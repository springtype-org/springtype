import { st } from "../../../src/core";
import { component } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { domRef, tsx } from "../../../src/web/vdom";

@component()
export class RefCmpTest extends st.component {

  makeRed = () => {

    console.log('makeRed', this.el.style);
    this.el.style.display = 'block';
    this.el.style.background = 'red';


  }

  render() {
    return <div>Works well if I'm becoming red</div>
  }
}

@component()
export class RefTest extends st.component implements ILifecycle {
  time: number = 0;

  @domRef("someDiv")
  someDiv!: HTMLDivElement;

  @domRef("redBox")
  redBox!: RefCmpTest;

  onGetDiv = () => {
    console.log("get div", st.getDomRef("someDiv", this), this.someDiv);

    this.time = Date.now();

    this.doRender();

    this.redBox.makeRed();
  };

  render() {
    return (
      <div>
        <RefCmpTest ref={{ redBox: this }}/>
        <button onClick={this.onGetDiv}>Get DIV</button>
        <div ref={{ someDiv: this }}>{this.time}</div>
      </div>
    );
  }
}

st.render(<RefTest />);
