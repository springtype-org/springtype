import { st } from "../../../src/core";
import { customElement, customEvent, emitCustomEvent, render } from "../../../src/web/customelement";
import { IEventListener } from "../../../src/web/customelement/interface";
import { IEvent } from "../../../src/web/customelement/interface/ievent";
import { ITypedStyleSheet } from "../../../src/web/tss/interface";
import { tsx } from "../../../src/web/vdom";

export interface StButtonClickEventDetail {
  specialStEvent: boolean;
}

export interface StButtonClickEvent extends IEvent<StButtonClickEventDetail> {}

@customElement("st-button")
export class StButton extends st.element {
  @customEvent
  onStClick: IEventListener<StButtonClickEventDetail, MouseEvent> = customEvent;

  renderStyle(): ITypedStyleSheet {
    return {
      button: {
        background: "navy",
        color: "white",
        "font-size": "20px",
      },
    };
  }

  // event handlers must always be scope-bound as fat arrow functions
  dispatchStClick = (evt: MouseEvent) => {
    emitCustomEvent<StButtonClickEventDetail>(this, "stclick", {
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
        <x-lol>FooBar</x-lol>
      </button>
    );
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-lol": Partial<HTMLElement>;
    }
  }
}

customElement("x-lol", render(() => <div>Kaputt?</div>));

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "st-button": Partial<StButton>;
    }
  }
}
