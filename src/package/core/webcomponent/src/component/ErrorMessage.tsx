import {WebComponent} from "../decorator/WebComponent";
import {Attribute} from "../decorator/Attribute";
import {WebComponentLifecycle} from "../..";

@WebComponent({
    tag: 'st-error-message',
    style: view => ({
        'p': {
            color: '#ff0000'
        }
    })
})
export class ErrorMessage extends HTMLElement implements WebComponentLifecycle {

    @Attribute
    message: string = "Unknown error.";

    render() {
        return <p>{ this.message }</p>
    }
}