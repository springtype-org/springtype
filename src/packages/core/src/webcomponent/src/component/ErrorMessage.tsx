import {WebComponent} from "../decorator/WebComponent";
import {Style} from "../decorator/Style";
import {VirtualElement} from "../../../virtualdom";
import {Partial} from "../../../lang";
import {ActiveRenderer} from "../../../renderer";
import {Field} from "../../../cd";

@WebComponent('st-error-message')
@Style((view) => ({
    'p': {
        color: '#ff0000'
    }
}))
export class ErrorMessage extends HTMLElement {

    @Field
    message: string = "Unknown error.";

    render() {
        return <p>{this.message}</p> as VirtualElement;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'st-error-message': Partial<ErrorMessage>;
        }
    }
}