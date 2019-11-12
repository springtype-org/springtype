import { st } from "../../../src/core";
import { component, emit, evt } from "../../../src/web/component";
import { IEvent, IEventListener } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";

export interface StButtonClickEventDetail {
  specialStEvent: boolean;
}

export interface StButtonClickEvent extends IEvent<StButtonClickEventDetail> {}

@component()
export class StButton extends st.component {
  @evt
  onStClick: IEventListener<StButtonClickEventDetail, MouseEvent> = evt;


  // event handlers must always be scope-bound as fat arrow functions
  dispatchStClick = (evt: MouseEvent) => {
    emit<StButtonClickEventDetail>(this.el, "stclick", {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        ...evt,
        specialStEvent: true,
      },
    });
  };

  render() {
    return (
      <button onClick={this.dispatchStClick}>
        |Start|
        {/* default label */}
        {this.renderChildren('Unlabled')}
        |End|
      </button>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "StButton": Partial<StButton>;
    }
  }
}
