import {WebComponent} from "../decorator/WebComponent";
import {Attribute} from "../decorator/Attribute";
import {Style} from "../decorator/Style";
import {VirtualElement} from "../../../virtualdom";
import {Partial} from "../../../lang";
import {ActiveRenderer} from "../../../renderer";

@WebComponent('st-error-message')
@Style((view) => ({
    'p': {
        color: '#ff0000'
    }
}))
export class ErrorMessage extends HTMLElement {

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