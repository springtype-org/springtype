import { globalThis, st } from "../st";

describe("$st", () => {
	it('globalThis["st"] is an object', () => {
		expect(globalThis["$st"]).toBeDefined();
		expect(globalThis["$st"]).toBeInstanceOf(Object);
	});

	it("my is an object", () => {
		expect(st).toBeDefined();
		expect(st).toBeInstanceOf(Object);
	});

	it('my equals globalThis["$st"]', () => {
		expect(st).toEqual(globalThis["$st"]);
	});
});
