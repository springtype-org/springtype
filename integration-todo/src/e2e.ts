// central object for identifiers of elements used in the app (app code and e2e-tests)
// this file is placed here to prevent testcafe from having a direct code dependency on
// app code and to make sure that id changes automatically reflect on both sides: e2e tests and app code.
export const e2e = {

    element: {
        'app-list-inner-partial': 'app-list-inner-partial'
    },

    page: {
        TodoListPage: {
            addButton: 'addButton',
            newTodoItemText: 'newTodoItemText'
        }
    }
};