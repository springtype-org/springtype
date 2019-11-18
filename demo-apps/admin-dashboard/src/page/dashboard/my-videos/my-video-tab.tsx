import { st } from "../../../../../../src/core";
import { attr, component } from "../../../../../../src/web/component";
import { ILifecycle } from "../../../../../../src/web/component/interface/ilifecycle";
import { tsx } from "../../../../../../src/web/vdom";
import { MyVideosTabOverview } from "./my-video-tab/my-video-tab-overview";

@component
export class MyVideosTabs extends st.component implements ILifecycle {

  render() {
    switch (this.tabIndex) {
      case 0:
        return <MyVideosTabOverview />;
    }

    return <fragment />;
  }
}
