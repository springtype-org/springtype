import {st} from "../../../src/core";
import {customElement} from "../../../src/web/customelement";
import {customElementsHMRPolyfill} from "../../../src/web/polyfill/custom-elements-hmr-polyfill";
import {tsx} from "../../../src/web/vdom";

if (process.env.NODE_ENV === "development") {
    customElementsHMRPolyfill;
}

let mapOfNames =  ['Rene'];

@customElement("my-foo",{shadowMode: "none"})
export class Foo extends st.customElement {

    constructor() {
        super();
        setTimeout(() => {
            mapOfNames =['Michael', 'Aron', 'Daniel', 'Bernd', 'Holger'];
            console.log('only rene', mapOfNames,this.render());
            this.doRender();
        }, 1500)
    }

    render() {
        return <div>{mapOfNames.map(value => <p class="name">{value}</p>)}</div>;
    }
}

document.body.innerHTML = "<my-foo></my-foo>";
