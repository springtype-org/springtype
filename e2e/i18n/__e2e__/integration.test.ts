import "testcafe";
import { Selector } from "testcafe";

fixture`i18n/dist/index.html`.page("../dist/index.html");

test("should translate en_US by default, uppercase format and deep", async t => {
  const trText = Selector("#e2e-tr");

  //await t.debug();

  await t.expect((await trText()).textContent).eql("123en-E2E");
});

test("should translate in german on language change", async t => {
  const trText = Selector("#e2e-tr");
  const germanBtn = Selector("#german");
  const englishBtn = Selector("#english");

  await t.click(await germanBtn());

  await t.expect((await trText()).textContent).eql("123de-E2E");

  await t.click(await englishBtn());

  await t.expect((await trText()).textContent).eql("123en-E2E");
});
