import "testcafe";
import { Selector } from "testcafe";

fixture`index.html`.page("../dist/index.html");

test("patch renderer replaces arrays of children correctly", async t => {
  const selectFirstParagraph = Selector(() => document.querySelector("e2e-children")!.shadowRoot!.querySelector("p")!);
  const selectLastParagraph = Selector(() => document.querySelector("e2e-children")!.shadowRoot!.querySelector("p:last-child")!);

  await t.expect((await selectFirstParagraph()).textContent).eql("Rene");

  await t.wait(600);

  await t.expect((await selectFirstParagraph()).textContent).eql("Michael");
  await t.expect((await selectLastParagraph()).textContent).eql("Holger");
});
