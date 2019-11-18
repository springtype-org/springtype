import "testcafe";
import { Selector } from "testcafe";

fixture`index.html#/login`.page("../dist/index.html#/login");

test("Shows the login container", async t => {

  const loginButton = Selector(() => document.querySelector("button"));
  await t.expect((await loginButton()).textContent).contains("Login!");
});
