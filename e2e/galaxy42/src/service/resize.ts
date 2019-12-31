import { injectable } from "../../../../src/core/di";
import { st } from "../../../../src/core";
import { pubsub } from "../../../../src/core/pubsub/pubsub";

export const EVENT_WINDOW_RESIZE = 'EVENT_WINDOW_RESIZE';

@injectable
export class ResizeService {

  constructor() {
    window.addEventListener('resize', this.onResize);
  }

  onResize = () => {
    st.publish(EVENT_WINDOW_RESIZE, null);
  }
}

st.enable(pubsub);
