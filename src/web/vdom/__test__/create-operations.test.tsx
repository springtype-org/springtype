import { IElement } from "../interface/IElement";
import { Renderer } from "../Renderer";
import { tsx } from "../VirtualDOM";

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
		const textElement = DOM.createElement(
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
		const listElement = DOM.createElement(listVNode) as IElement;
		expect(listElement.nodeName).toEqual("UL");
	});

	it("creates child elements for an existing element", () => {
		const childVNode = (
			<div>
				<a href="#">Test</a>
			</div>
		);
		const parentElement = DOM.createElement(<div></div>) as IElement;

		DOM.createChildElements(childVNode.props.children, parentElement);

		expect(parentElement.childNodes.length).toEqual(1);
		expect(parentElement.childNodes[0].nodeName).toEqual("A");
	});

	it("applies props as attributes", () => {
		const vnodeWithAttribute = <div id={"123"}></div>;
		const parentElement = DOM.createElement(<div></div>) as IElement;

		DOM.setAttributes(vnodeWithAttribute.props, parentElement);

		expect(parentElement.getAttribute("id")).toEqual("123");
	});
	*/
});
