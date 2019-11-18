import { st } from "../../../../src/core";
import { component } from "../../../../src/web/component";
import { tsx } from "../../../../src/web/vdom";
import { IElement, IVirtualNode } from "../../../../src/web/vdom/interface";

@component
export class HomePage extends st.component {
  static ROUTE = "#/home";

  onBeforeElCreate(virtualNode: IVirtualNode) {
    console.log("onBeforeElCreate", virtualNode);

    //virtualNode.attributes['class'] = 'onBeforeElCreate-foo';
  }

  onAfterElCreate(el: IElement) {
    console.log("onAfterElCreate", el, "this.elClass did onBeforeElCreate transform work?", this.elClass);

    // set classes on this.el
    this.elClass = ["foo", ...(this.elClass as Array<string>)];

    this.elStyle = {
      backgroundColor: "red",
      display: "block",
    };

    // set attributes on this.el
    this.elAttributes = {
      id: "ads",
      tabIndex: 1,
    };
  }

  onPatch() {
    console.log("got patched!");
  }

  render() {
    console.log("render homepage", this.el.id);

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
    console.log("inspect after first render homepage", this.elClass, this.elStyle, this.elAttributes);
    this.doRender();
  }

  onDisconnect() {
    console.log("dialog disconnect homepage");
  }

  onAfterPatchEl() {
    console.log("this.el has been patched");
  }

  handleUpdateElAttribute(name: string, value: any) {
    console.log("have to handle an attribute", name, "change to", value, " passed by VDOM!");

    switch (name) {
      case "class":
        this.elClass = [...(this.elClass as Array<string>), ...(value as Array<string>)];
        return;

      case "style":
        this.elStyle = {
          ...this.elStyle,
          ...value,
        };
        return;
      default:
        this.elAttributes = {
          [name]: value,
        };
    }
  }
}
