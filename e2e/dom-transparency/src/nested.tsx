import {component} from "../../../src/web/component";
import {st} from "../../../src/core/st";
import {tsx} from "../../../src/web/vdom";
import {ILifecycle} from "../../../src/web/component/interface";
import './nestedclass.css'
@component
export class Nested extends st.component implements ILifecycle {


    onAfterElCreate() {
        this.class = [...this.class, 'nested']
    }

    render() {
        return this.renderChildren();
    }
}