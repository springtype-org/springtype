import { st } from "../../../../src/core";
import { ref } from "../../../../src/core/ref";
import { component } from "../../../../src/web/component";
import { tsx } from "../../../../src/web/vdom";
import { ILifecycle } from "../../../../src/web/component/interface";
import { debounce } from "../../../../src/core/lang/debounce";

@component
export default class AboutPage extends st.component implements ILifecycle {

  @ref
  paramContainer: HTMLElement;

  render() {
    return <div>About, name: <p ref={{paramContainer: this}}></p> <button onClick={this.onButtonClick}>Click me</button></div>;
  }

  onButtonClick = debounce(() => {
    console.log('click debounce 1sec')
  }, 1000)

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
