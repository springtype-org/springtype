import {Element} from "../decorator/Element";
import {Attribute} from "../decorator/Attribute";
import {Lifecycle} from "../..";
import {Style} from "../decorator/Style";
import {VirtualElement} from "../../../virtualdom";
import {Partial} from "../../../lang";

@Element('st-error-message')
@Style((view) => ({
    'p': {
        color: '#ff0000'
    }
}))
export class ErrorMessage extends HTMLElement implements Lifecycle {

    @Attribute
    message: string = "Unknown error.";

    render() {
        return <p>{ this.message }</p> as VirtualElement;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-error-message': Partial<ErrorMessage>;
        }
    }
}