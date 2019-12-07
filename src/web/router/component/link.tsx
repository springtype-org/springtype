import { st } from "../../../core";
import { attr, component } from "../../component";
import { ILifecycle } from "../../component/interface";
import { AttrType } from "../../component/trait/attr";

export interface ILinkAttrs {
  path: string;
  params?: any;
  href?: string;
  target?: string;
  activeClass?: string;
}

export const LINK_ACTIVE_CLASS = 'active';
export const A_ELEMENT_TAG = 'a';

// <Link />
@component
export class Link extends st.component<ILinkAttrs> implements ILifecycle {

  tag: string = A_ELEMENT_TAG;

  @attr
  exact: boolean = true;

  @attr
  path: string = "";

  @attr
  params?: any;

  @attr
  target?: string;

  @attr
  href?: string = 'javascript:void(0)';

  @attr
  activeClass?: string;

  onClick = () => {

    st.route = {
      path: this.path,
      params: this.params
    }
  }

  onAfterElCreate() {

    // register callback for future route changes
    st.router.addOnAfterMatchHandler(this.updateActiveClass);

    if (this.tag.toLowerCase() === A_ELEMENT_TAG) {
      if (this.target) {
        this.setAttribute('target', this.target, AttrType.DOM_TRANSPARENT);
      }
      if (this.href) {
        this.setAttribute('href', this.href, AttrType.DOM_TRANSPARENT);
      }
    }
  }

  onAfterInitialRender() {
    this.updateActiveClass();
  }

  updateActiveClass = () => {

    const activeClassName = this.activeClass || LINK_ACTIVE_CLASS;

    if (!Array.isArray(this.class)) {
      this.class = [this.class];
    }

    if (st.route && st.route.paths!.indexOf(this.path) > -1) {
      this.class = [...this.class, activeClassName];
    } else {
      this.class = this.class.filter((className: string) => className !== activeClassName);
    }
  }

  render() {
    return this.renderChildren();
  }

  onDisconnect() {
    st.router.removeOnAfterMatchHandler(this.updateActiveClass);
  }
}
