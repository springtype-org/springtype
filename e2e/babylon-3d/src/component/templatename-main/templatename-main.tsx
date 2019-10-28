import { st } from "../../../../../src/core";
import { customElement } from "../../../../../src/web/customelement";
import { ILifecycle } from "../../../../../src/web/customelement/interface";
import tpl from "./templatename-main.tpl";
import tss from "./templatename-main.tss";

@customElement({
    tpl,
    tss
})
export class TemplateNameMain extends st.element implements ILifecycle {
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'TemplateNameMain': Partial<TemplateNameMain>;
        }
    }
}

