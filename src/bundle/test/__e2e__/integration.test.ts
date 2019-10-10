import "testcafe";
import { Selector } from "testcafe";

fixture`index.html`.page("../dist/index.html");

test("proof it is rendering well", async t => {
  const testOK = Selector(() => document.querySelector("st-bundle-test")!.shadowRoot!.querySelector("#testOK")!);
  const styleText = Selector(() => document.querySelector("st-bundle-test")!.shadowRoot!.querySelector("#styleText")!);
  const attr = Selector(() => document.querySelector("st-bundle-test")!.shadowRoot!.querySelector("#attr")!);
  const env = Selector(() => document.querySelector("st-bundle-test")!.shadowRoot!.querySelector("#env")!);

  await t.expect((await testOK()).textContent).eql("Test OK");
  await t.expect((await styleText()).textContent.substring(0, 4)).eql(`body`);
  await t.expect((await attr()).textContent).eql("bar-test");
  await t.expect((await env()).textContent).eql("production");
});
