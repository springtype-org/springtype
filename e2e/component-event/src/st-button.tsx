import { st } from "../../../src/core";
import { component, event } from "../../../src/web/component";
import { IEvent, IEventListener } from "../../../src/web/component/interface";
import { tsx } from "../../../src/web/vdom";

export interface StButtonClickEventDetail {
  specialStEvent: boolean;
}

export interface StButtonClickEvent extends IEvent<StButtonClickEventDetail> {}

@component
export class StButton extends st.component {

  @event
  onStClick!: IEventListener<MouseEvent>;

  // event handlers must always be scope-bound as fat arrow functions
  dispatchStClick = (evt: MouseEvent) => {
    this.dispatchEvent<StButtonClickEventDetail>("stclick", {
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
