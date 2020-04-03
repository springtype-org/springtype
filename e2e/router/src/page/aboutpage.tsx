import { st } from "../../../../src/core";
import { ref } from "../../../../src/core/ref";
import { component } from "../../../../src/web/component";
import { tsx } from "../../../../src/web/vdom";
import { ILifecycle } from "../../../../src/web/component/interface";

@component
export default class AboutPage extends st.component implements ILifecycle {

  @ref
  paramContainer: HTMLElement;

  render() {
    return <div>About, name: <p ref={{paramContainer: this}}></p></div>;
  }

  onRouteEnter() {
    console.log('ENTERED ABOUT PAGE')

    this.renderPartial(st.route.params.name.toString(), this.paramContainer);



    // e.g. enable animation
  }

  onRouteLeave() {
    console.log('LEFT ABOUT PAGE');

    // e.g. disable animations (CPU load intensive tasks)
  }
}
