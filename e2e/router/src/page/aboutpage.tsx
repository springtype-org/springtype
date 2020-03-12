import { st } from "../../../../src/core";
import { component } from "../../../../src/web/component";
import { tsx } from "../../../../src/web/vdom";
import { ILifecycle } from "../../../../src/web/component/interface";
import {IRouteParams} from "../../../../src/web/router/interface/iroute-match";

@component
export default class AboutPage extends st.component implements ILifecycle {

  render() {
    return <div>About, name: {st.route.params.name}</div>;
  }

  onRouteEnter() {
    console.log('ENTERED ABOUT PAGE')

    // e.g. enable animation
  }

  onRouteLeave() {
    console.log('LEFT ABOUT PAGE');

    // e.g. disable animations (CPU load intensive tasks)
  }
}
