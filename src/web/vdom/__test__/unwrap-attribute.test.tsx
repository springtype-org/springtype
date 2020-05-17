import {tsx} from "../";
import {st} from "../../../core";
import {IElement} from "../interface";

describe("Renderer an element with unwrap attribute", () => {
    let parentDOMElement: IElement;

    beforeEach(() => {
        parentDOMElement = (document.createElement("div") as unknown) as IElement;
    });

    it("renders a <div> (JSX.Element extends IVirtualNode) as a child of a DOM element with unwrap attribute, renderer have to skip them", () => {
        const wrappedWithFragment = (
            <div unwrap>
                <div unwrap>
                    <div id="123">Foo</div>
                </div>
            </div>
        );

        st.renderer.render(wrappedWithFragment, parentDOMElement);

        expect((parentDOMElement.childNodes[0] as HTMLDivElement).id).toEqual("123");
        expect((parentDOMElement.childNodes[0] as HTMLDivElement).textContent).toEqual("Foo");
    });
});
