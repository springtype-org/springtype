import { OperatorFunction } from "../interface/ioperator-function";
import { JournalStream } from "../journal-stream";

interface User {
	id: number;
	firstName: string;
	isPhantom?: boolean;
}

describe("Stream class", () => {

	const testItem = {
		id: 1,
		firstName: 'Aron'
	};

	const makePhantomOperator: OperatorFunction<User> = async (user: User) => {
		user.isPhantom = true;
		return user;
	}

	const uppercaseOperator: OperatorFunction<User> = async (user: User) => {
		user.firstName = user.firstName.toUpperCase();
		return user;
	}

	const delayOperator: OperatorFunction<any> = async () => {
		return new Promise(resolve => setTimeout(resolve, 100));
	}


	it('can be instantiated', () => {

		// API contract test
		const $ = new JournalStream();
		expect($.pipe).toBeDefined();
		expect($.pipe).toBeInstanceOf(Function);
		expect($.write).toBeDefined();
		expect($.write).toBeInstanceOf(Function);
		expect($.subscribeForFuture).toBeDefined();
		expect($.subscribeForFuture).toBeInstanceOf(Function);
		expect($.destroy).toBeDefined();
		expect($.destroy).toBeInstanceOf(Function);
	});

	it('can have piped operator', async () => {

		const $ = new JournalStream<User>()
			.pipe(makePhantomOperator);

		$.subscribeForFuture((user: User) => {
			expect(user.isPhantom).toBeTruthy();
		});

		$.write(testItem);
	});

	it('can have multiple piped operators', async () => {

		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				uppercaseOperator
			);

		$.subscribeForFuture((user: User) => {
			expect(user.isPhantom).toBeTruthy();
			expect(user.firstName).toEqual('ARON');
		});

		$.write(testItem);
	});

	it('can handle async time delay in operators', async () => {

		const startTime = Date.now();
		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				delayOperator,
				uppercaseOperator
			);

		$.subscribeForFuture(() => {
			const durationMs = Date.now() - startTime;
			expect(durationMs).toBeGreaterThanOrEqual(100);
		});

		$.write(testItem);
	});

	it('calls subscriber for every item written and processed', async () => {

		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				uppercaseOperator
			);

		const subscriber = jest.fn((user: User) => {
			expect(user.isPhantom).toBeTruthy();
			if (user.id === 2) {
				expect(user.firstName).toEqual('BRON');
			}
			if (user.id === 3) {
				expect(user.firstName).toEqual('CRON');
			}
		});

		$.subscribeForFuture(subscriber);

		$.write({
			id: 2,
			firstName: 'Bron'
		}, {
			id: 3,
			firstName: 'Cron'
		});

		await $.subscribersCalled();

		expect(subscriber).toHaveBeenCalledTimes(2);
	});

	it('processes occasional writes', async () => {

		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				uppercaseOperator
			);

		const itemState = await $.writeAndReturn({
			id: 3,
			firstName: 'Cron'
		});

		expect(itemState.firstName).toEqual('CRON');
	});

	it('does not fire after unsubscribe', async () => {

		const subscriber = jest.fn(() => { });

		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				uppercaseOperator
			);

		const unsubscribe = $.subscribeForFuture(subscriber);

		unsubscribe();

		$.write({
			id: 3,
			firstName: 'Cron'
		});

		await $.subscribersCalled();

		expect(subscriber).toHaveBeenCalledTimes(0);
	});

	it('does fire on multiple subscribers, multiple values, early', async () => {

		const subscriber = jest.fn(() => { });
		const subscriber2 = jest.fn(() => { });

		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				uppercaseOperator
			);

		await $.write({
			id: 3,
			firstName: 'Cron'
		});

		await $.write({
			id: 4,
			firstName: 'Dron'
		});

		$.subscribeForPastAndFuture(subscriber, subscriber2);

		await $.subscribersCalled();

		expect(subscriber).toHaveBeenCalledTimes(2);
		expect(subscriber2).toHaveBeenCalledTimes(2);
	});

	it('does fire on multiple subscribers, multiple values, late', async () => {

		const subscriber = jest.fn(() => { });
		const subscriber2 = jest.fn(() => { });

		const $ = new JournalStream<User>()
			.pipe(
				makePhantomOperator,
				uppercaseOperator
			);

		$.subscribeForPastAndFuture(subscriber, subscriber2);

		await $.write({
			id: 3,
			firstName: 'Cron'
		});

		await $.write({
			id: 4,
			firstName: 'Dron'
		});

		expect(subscriber).toHaveBeenCalledTimes(2);
		expect(subscriber2).toHaveBeenCalledTimes(2);
	});

	it('does GC on destroy', async () => {

		try {
			const $ = new JournalStream<User>()
				.pipe(
					makePhantomOperator,
					uppercaseOperator
				);

			$.subscribeForFuture(() => { });

			const itemState = await $.writeAndReturn({
				id: 3,
				firstName: 'Cron'
			});

			$.destroy();
			expect(itemState.firstName).toEqual('CRON');
			// @ts-ignore
			expect($.items).toHaveLength(0);
			// @ts-ignore
			expect($.operators).toHaveLength(0);
			// @ts-ignore
			expect($.subscribers).toHaveLength(0);
		} catch (e) {
			console.error(e);
		}
	});


	it('waits until completed, never calls subscriber if not completed', async () => {

		const subscriber = jest.fn(() => { });

		const $1 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toLowerCase(); return user; })
			.waitUntilCompleted();

		await $1
			.write({
				firstName: 'Lron',
				id: 8
			}, {
				firstName: 'Mron',
				id: 9
			});

		$1.subscribeForPastAndFuture(subscriber);

		expect(subscriber).not.toHaveBeenCalled();
	});

	it('waits until completed, calls subscriber 2x', async () => {

		const subscriber = jest.fn(() => { });

		const $1 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toLowerCase(); return user; })
			.waitUntilCompleted();

		await $1
			.write({
				firstName: 'Lron',
				id: 8
			}, {
				firstName: 'Mron',
				id: 9
			});

		$1.setCompleted();

		$1.subscribeForPastAndFuture(subscriber);

		await $1.subscribersCalled();

		expect(subscriber).toHaveBeenCalledTimes(2);
	});

	it('Does not call subscribers for undefined values', async() => {
		const subscriber = jest.fn(() => { });

		const $1 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toLowerCase(); return user; }, (user: User) => {
				return undefined;
			})
			.waitUntilCompleted();

		await $1
			.write({
				firstName: 'Lron',
				id: 8
			}, {
				firstName: 'Mron',
				id: 9
			});

		$1.setCompleted();

		$1.subscribeForPastAndFuture(subscriber);

		expect(subscriber).toHaveBeenCalledTimes(0);
	})
});
