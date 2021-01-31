import { globalThis, st } from "../st";

describe("$st", () => {
	it('globalThis["$st"] is an object', () => {
		expect(globalThis["$st"]).toBeDefined();
		expect(globalThis["$st"]).toBeInstanceOf(Object);
	});

	it("st is defined", () => {
		expect(st).toBeDefined();
		expect(st).toBeInstanceOf(Object);
	});

	it('st equals globalThis["$st"]', () => {
		expect(st).toEqual(globalThis["$st"]);
	});

	it('st can store an arbitrary state', () => {
		expect(st.state).toEqual({});
		st.state.foo = 'bar';
		expect(st.state.foo).toEqual('bar');
	});
});
