import { st } from "../../../src/core";
import { ChangeType } from "../../../src/core/cd/interface/change-type";
import { component, state } from "../../../src/web/component";
import { ILifecycle } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";
import { StButton, StButtonClickEvent, StButtonClickEventDetail } from "./st-button";

if (process.env.NODE_ENV === "development") {

  // enable framework internal logging
  st.debug = true;
}

@component()
export class MyIndex extends st.component implements ILifecycle {
  // using a @state() decoration enables change detection and auto-rerendering
  // whenever the reference changes (like this.eventDetails = $somethingElse)
  // or a deep change happens (like this.eventDetails.foo = 'bar')
  @state
  evtDetail?: StButtonClickEventDetail;

  @state(ChangeType.REFERENCE)
  evtDetailDeep?: StButtonClickEventDetail;

  onStButtonClick = (evt: StButtonClickEvent) => {
    // assignment causes a re-rendering because evtDetails is a @state()
    this.evtDetail = evt.detail;

    console.log("specialStEvent", evt.detail.specialStEvent);
  };

  render() {
    return (
      <fragment>
        <StButton onStClick={this.onStButtonClick}>Click me! {this.evtDetail && this.evtDetail.specialStEvent ? "Yes" : "No"}</StButton>

        <h3>Did custom event dispatch?</h3>
        <div>{this.evtDetail && this.evtDetail.specialStEvent ? "Yes" : "No"}</div>
      </fragment>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "MyIndex": Partial<MyIndex>;
    }
  }
}

st.render(<MyIndex />);
