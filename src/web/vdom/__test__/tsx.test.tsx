import { tsx } from "../tsx";

describe("VirtualDOM", () => {
	it("transforms a <ul> list into JSX.Element which extends IVirtualNode", () => {
		const list = (
			<ul>
				<li id="123"></li>
			</ul>
		);

		expect(list).toBeDefined();
		expect(list.props).toBeDefined();
		expect(list.props.children).toBeDefined();
		expect(list.props.children.length).toBe(1);
	});
});
