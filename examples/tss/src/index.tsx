import {Theme, WebApp} from "@springtype/springtype-incubator-core";
import {TSStyledComponent} from "./tss/TSStyledComponent";
import {theme} from "./theme";

@Theme(theme)
@WebApp({
    routes: {
        '': <tsstyled-component />
    },
    components: [
        TSStyledComponent
    ]
})
export class TSSExampleApp {}