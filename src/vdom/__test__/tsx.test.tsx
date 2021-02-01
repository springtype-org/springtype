import { tsx } from "../..";

describe("VirtualDOM", () => {
  it("transforms a <ul> list into JSX.Element which extends IVirtualNode", () => {
    const list = (
      <ul>
        <li id="123"/>
      </ul>
    );

    expect(list).toBeDefined();
    expect(list.children).toBeDefined();
    expect(list.children.length).toBe(1);
  });
});
