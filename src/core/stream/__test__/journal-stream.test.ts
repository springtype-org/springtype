import { OperatorFunction } from "../interface/ioperator-function";
import { JournalStream } from "../journal-stream";

interface User {
	id: number;
	firstName: string;
	isPhantom?: boolean;
}

describe("JournalStream class", () => {

	const makePhantomOperator: OperatorFunction<User> = async (user: User) => {
		user.isPhantom = true;
		return user;
	}

	it('can merge the past and the future', async () => {

		const $1 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toLowerCase(); return user; })

		await $1.write({
			id: 5,
			firstName: 'Eron'
		})

		const $2 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toUpperCase(); return user; })

		await $2.write({
			id: 6,
			firstName: 'Fron'
		});

		await $2.write({
			id: 7,
			firstName: 'Gron'
		});

		const $3 = new JournalStream<User>()
			.pipe(makePhantomOperator)
			.mergePastAndFuture($1, $2)

		await $2.write({
			id: 8,
			firstName: 'Hron'
		});

		await $3.write({
			id: 9,
			firstName: 'Mansi'
		});

		const eron = { id: 5, firstName: 'eron', isPhantom: true };
		const FRON = { id: 6, firstName: 'FRON', isPhantom: true };
		const GRON = { id: 7, firstName: 'GRON', isPhantom: true };
		const HRON = { id: 8, firstName: 'HRON', isPhantom: true };
		const Mansi = { id: 9, firstName: 'Mansi', isPhantom: true };
		let call = 0;

		$3.subscribeForPastAndFuture((user: User) => {

			call++;

			switch (call) {
				case 1:
					expect(user).toEqual(eron);
					break;

				case 2:
					expect(user).toEqual(FRON);
					break;

				case 3:
					expect(user).toEqual(GRON);
					break;

				case 4:
					expect(user).toEqual(HRON);
					break;

				case 5:
					expect(user).toEqual(Mansi);
					break;
			}
		});
	});

	it('can merge the past and the future, pipe used after merge', async () => {

		const $1 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toLowerCase(); return user; })

		await $1.write({
			id: 5,
			firstName: 'Eron'
		})

		const $2 = new JournalStream<User>()
			.pipe((user: User) => { user.firstName = user.firstName.toUpperCase(); return user; })

		await $2.write({
			id: 6,
			firstName: 'Fron'
		});

		await $2.write({
			id: 7,
			firstName: 'Gron'
		});

		const $3 = new JournalStream<User>()
			.mergePastAndFuture($1, $2)
			.pipe(makePhantomOperator) //

		await $2.write({
			id: 8,
			firstName: 'Hron'
		});

		await $3.write({
			id: 9,
			firstName: 'Mansi'
		});

		const eron = { id: 5, firstName: 'eron' };
		const FRON = { id: 6, firstName: 'FRON' };
		const GRON = { id: 7, firstName: 'GRON' };
		const HRON = { id: 8, firstName: 'HRON', isPhantom: true };
		const Mansi = { id: 9, firstName: 'Mansi', isPhantom: true };
		let call = 0;

		$3.subscribeForPastAndFuture((user: User) => {

			call++;

			switch (call) {
				case 1:
					expect(user).toEqual(eron);
					break;

				case 2:
					expect(user).toEqual(FRON);
					break;

				case 3:
					expect(user).toEqual(GRON);
					break;

				case 4:
					expect(user).toEqual(HRON);
					break;

				case 5:
					expect(user).toEqual(Mansi);
					break;
			}
		});
	});
});
