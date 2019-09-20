import "testcafe";
fixture`Test`;

test("Test", async t => {
	await t.expect(true).ok();
});
