import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { tsx } from "../../../../../src/web/vdom";
import { IElement, IVirtualNode } from "../../../../../src/web/vdom/interface";

@component()
export class HomePage extends st.component {
  static ROUTE = "/home";

  onBeforeElCreate(virtualNode: IVirtualNode) {

    console.log('onBeforeElCreate', virtualNode)
  }
  onAfterElCreate(el: IElement) {

    console.log('onAfterElCreate', el);

    // set classes on this.el
    this.elClass = ['foo'];

    this.elStyle = {
      backgroundColor: 'magenta'
    };

    // set attributes on this.el
    this.elAttributes = {
      id: 'ads',
      tabIndex: 1
    };
  }

  render() {

    // construct children for this.el
    return (
      <div>
        HomePage <br />
        {/* manually typed link, also no API used for routing */}
        <a href="/#/blog/">Blog</a>
      </div>
    );
  }

  onAfterInitialRender() {
    console.log('inspect after render', this.elClass, this.elStyle, this.elAttributes);
  }
}
