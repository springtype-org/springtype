import { Selector } from 'testcafe';
import {e2e} from "../src/e2e";

fixture `Todo MVC`
    .page `http://localhost:1234`;


test('add a todo', async t => {
    await t
        .typeText('#' + e2e.page.TodoListPage.newTodoItemText, 'A new todo')
        .click('#' + e2e.page.TodoListPage.addButton)
        .expect(Selector(e2e.element["app-list-inner-partial"]).innerText)
            .contains('A new todo');
});