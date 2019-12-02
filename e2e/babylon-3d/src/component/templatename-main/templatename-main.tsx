import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import "./templatename-main.scss";
import tpl from "./templatename-main.tpl";

@component({
  tpl,
})
export class TemplateNameMain extends st.component implements ILifecycle {
  class = "TemplateNameMain";
}
