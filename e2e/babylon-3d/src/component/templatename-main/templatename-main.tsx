import { st } from "../../../../../src/core";
import { component } from "../../../../../src/web/component";
import { ILifecycle } from "../../../../../src/web/component/interface";
import tpl from "./templatename-main.tpl";
import tss from "./templatename-main.tss";

@component({
    tpl,
    tss
})
export class TemplateNameMain extends st.component implements ILifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'TemplateNameMain': Partial<TemplateNameMain>;
        }
    }
}

