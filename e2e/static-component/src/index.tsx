import {st} from "../../../src/core";
import {component} from "../../../src/web/component";
import {tsx} from "../../../src/web/vdom";


export interface IFooAttrs {
}

@component
class Fuu<ATTR> extends st.staticComponent <ATTR> {
}

@component({tag: 'Faa'})
export class Foo extends Fuu <IFooAttrs> {

    render() {
        return <div style="color: green">!Rendered!</div>;
    }
}

st.render(<Foo/>);
