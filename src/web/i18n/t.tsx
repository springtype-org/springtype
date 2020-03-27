import { component, attr } from "../component";
import { st } from "../../core";
import { ILifecycle } from "../component/interface";
import { ITranslationValues } from "../../core/i18n/interface/itranslation-values";

export interface ITProps {
  values?: ITranslationValues;
}

/**
 * Translates
 */
@component
export class T extends st.staticComponent<ITProps> implements ILifecycle {

  @attr
  values: ITranslationValues = {};

  constructor() {
    super();
    st.i18n.registerTComponent(this);
  }

  render() {
    return this.translate();
  }

  translate(): string {
    return st.t(this.getKey(), this.values);
  }

  getKey() {
    return (this.virtualNode!.slotChildren!.default as any)[0];
  }

  t() {
    this.el.innerText = this.translate();
  }

  onDisconnect() {
    st.i18n.unregisterTComponent(this);
  }
}
