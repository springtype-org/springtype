import {Element} from "../decorator/Element";
import {Attribute} from "../decorator/Attribute";
import {WebComponentLifecycle} from "../..";
import {Style} from "../decorator/Style";

@Element('st-error-message')
@Style((view) => ({
    'p': {
        color: '#ff0000'
    }
}))
export class ErrorMessage extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    message: string = "Unknown error.";

    render() {
        return <p>{ this.message }</p>
    }
}