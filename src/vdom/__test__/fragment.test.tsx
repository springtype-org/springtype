import { render, st } from "../..";
import { IElement } from "../interface/ielement";

describe("Renderer an fragment", () => {
    let parentDOMElement: IElement;

    beforeEach(() => {
        parentDOMElement = (document.createElement("div") as unknown) as IElement;
    });

    it("renders a <fragment> (JSX.Element extends IVirtualNode) as a child of a DOM element, renderer have to skip them", () => {
        const wrappedWithFragment = (
            <fragment>
                <fragment>
                    <div id="123">Foo</div>
                </fragment>
            </fragment>
        );

        st.renderer.render(wrappedWithFragment, parentDOMElement);

        expect((parentDOMElement.childNodes[0] as HTMLDivElement).id).toEqual("123");
        expect((parentDOMElement.childNodes[0] as HTMLDivElement).textContent).toEqual("Foo");
    });
});
