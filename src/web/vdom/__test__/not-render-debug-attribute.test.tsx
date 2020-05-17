import {tsx} from "../";
import {st} from "../../../core";
import {IElement} from "../interface";

describe("Ensure debug attribute is not rendered", () => {
    let parentDOMElement: IElement;

    beforeEach(() => {
        parentDOMElement = (document.createElement("div") as unknown) as IElement;
    });

    it("try to render an <div> (JSX.Element extends IVirtualNode) as a child of a DOM element with debug attribute", () => {
        //@ts-ignore
        const wrappedWithFragment = (<div id="123" __source="source" __self="self" __any="any"/>);

        st.renderer.render(wrappedWithFragment, parentDOMElement);

        expect((parentDOMElement.childNodes[0] as HTMLDivElement).getAttribute("__source")).toBeNull();
        expect((parentDOMElement.childNodes[0] as HTMLDivElement).getAttribute("__self")).toBeNull();
        expect((parentDOMElement.childNodes[0] as HTMLDivElement).getAttribute("__any")).toBeNull();
    });
});
