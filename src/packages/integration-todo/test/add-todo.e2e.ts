import { Selector } from 'testcafe';
import {testSelectors} from "../src/test-selectors";

fixture `Todo MVC`
    .page `http://localhost:4444`;


test('add a todo', async t => {
    await t
        .typeText('#' + testSelectors.page.TodoListPage.newTodoItemText, 'A new todo')
        .click('#' + testSelectors.page.TodoListPage.addButton)
        .expect(Selector(testSelectors.element["app-list-inner-partial"]).innerText)
            .contains('A new todo');
});