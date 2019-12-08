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

	it('runs a synchronous microtask', () => {
		const microtask = jest.fn();
		st.run(microtask);
		expect(microtask).toHaveBeenCalled();
	});

	it('runs an async microtask', async(cb: Function) => {

		const startTime = Date.now();
		const microtask = jest.fn(async() => {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
					expect(Date.now() - startTime).toBeGreaterThanOrEqual(100);
					cb();
				}, 100);
			})
		});

		await st.run(microtask);

		expect(microtask).toHaveBeenCalled();
	})
});
