import { st } from "../../../src/core";
import { StateChangeType } from "../../../src/core/state/interface";
import { customElement, state } from "../../../src/web/customelement";
import { ILifecycle } from "../../../src/web/customelement/interface";
import { customElementsHMRPolyfill } from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import { tsx } from "../../../src/web/vdom";
import { StButtonClickEvent, StButtonClickEventDetail } from "./st-button";

if (process.env.NODE_ENV === "development") {
  customElementsHMRPolyfill;

  // enable framework internal logging
  st.debug = true;
}

@customElement("st-index")
export class Index extends st.element implements ILifecycle {
  // using a @state() decoration enables change detection and auto-rerendering
  // whenever the reference changes (like this.eventDetails = $somethingElse)
  // or a deep change happens (like this.eventDetails.foo = 'bar')
  @state
  evtDetail?: StButtonClickEventDetail;

  @state(StateChangeType.REFERENCE)
  evtDetailDeep?: StButtonClickEventDetail;

  onStButtonClick = (evt: StButtonClickEvent) => {
    // assignment causes a re-rendering because evtDetails is a @state()
    this.evtDetail = evt.detail;

    console.log("yep", evt.detail.specialStEvent);
  };

  render() {
    console.log("render");
    return (
      <div>
        <st-button onStClick={this.onStButtonClick}>Click me! {this.evtDetail && this.evtDetail.specialStEvent ? "Yes" : "No"}</st-button>

        <h3>Did custom event dispatch?</h3>
        <div>{this.evtDetail && this.evtDetail.specialStEvent ? "Yes" : "No"}</div>
      </div>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "st-index": Partial<Index>;
    }
  }
}

st.dom.setRoot("st-index");
