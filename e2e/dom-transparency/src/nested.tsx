import {component} from "../../../src/web/component";
import {st} from "../../../src/core/st";
import {ILifecycle} from "../../../src/web/component/interface";
import './nestedclass.css'

@component
export class Nested extends st.component implements ILifecycle {

    class = ['nested'];

    render() {
        console.log('Nested render');
        return this.renderChildren();
    }
}
