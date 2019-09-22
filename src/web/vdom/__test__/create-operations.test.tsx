import { IElement } from "../interface/ielement";
import { Renderer } from "../renderer";
import { tsx } from "../tsx";

describe("Renderer create operation", () => {
	let parentDOMElement: IElement;

	beforeEach(() => {
		parentDOMElement = (document.createElement("div") as unknown) as IElement;
	});

	it("renders a <ul> list (JSX.Element extends IVirtualNode) as a child of a DOM element", () => {
		const list = (
			<ul>
				<li id="123">
					<hr />
				</li>
			</ul>
		);

		Renderer.renderInitial(list, parentDOMElement);

		expect((parentDOMElement.childNodes[0] as HTMLLIElement).id).toEqual("123");
		expect(
			(parentDOMElement.childNodes[0] as HTMLLIElement).childNodes[0].nodeName
		).toEqual("HR");
	});

	/*
	it("creates a Text element", () => {
		const innerTextElementVNode = <div>Some text</div>;
		const textElement = st.dom.createElement(
			innerTextElementVNode.props.children[0]
		) as Text;
		expect(textElement.nodeValue).toEqual("Some text");
	});

	it("creates a HTMLUListElement", () => {
		const listVNode = (
			<ul>
				<li></li>
			</ul>
		);
		const listElement = st.dom.createElement(listVNode) as IElement;
		expect(listElement.nodeName).toEqual("UL");
	});

	it("creates child elements for an existing element", () => {
		const childVNode = (
			<div>
				<a href="#">Test</a>
			</div>
		);
		const parentElement = st.dom.createElement(<div></div>) as IElement;

		st.dom.createChildElements(childVNode.props.children, parentElement);

		expect(parentElement.childNodes.length).toEqual(1);
		expect(parentElement.childNodes[0].nodeName).toEqual("A");
	});

	it("applies props as attributes", () => {
		const vnodeWithAttribute = <div id={"123"}></div>;
		const parentElement = st.dom.createElement(<div></div>) as IElement;

		st.dom.setAttributes(vnodeWithAttribute.props, parentElement);

		expect(parentElement.getAttribute("id")).toEqual("123");
	});
	*/
});
