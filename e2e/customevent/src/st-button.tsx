import { st } from "../../../src/core";
import { customElement, customEvent, emitCustomEvent } from "../../../src/web/customelement";
import { IEventListener } from "../../../src/web/customelement/interface";
import { IEvent } from "../../../src/web/customelement/interface/ievent";
import { tsx } from "../../../src/web/vdom";

export interface StButtonClickEventDetail {
  specialStEvent: boolean;
}

export interface StButtonClickEvent extends IEvent<StButtonClickEventDetail> {}

@customElement()
export class StButton extends st.element {
  @customEvent
  onStClick: IEventListener<StButtonClickEventDetail, MouseEvent> = customEvent;

  renderStyle() {
    return `button {
      background: navy;
      color: white;
      font-size: 20px;
    }`
  }

  // event handlers must always be scope-bound as fat arrow functions
  dispatchStClick = (evt: MouseEvent) => {
    emitCustomEvent<StButtonClickEventDetail>(this.getRoot(), "stclick", {
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
        <slot>Unlabled</slot>
        |End|
      </button>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "st-button": Partial<StButton>;
    }
  }
}
