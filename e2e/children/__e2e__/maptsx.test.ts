import "testcafe"

fixture`map tsx`.page('../dist/index.html');
test("map test", async (t) => {
    await t.wait(100)
});