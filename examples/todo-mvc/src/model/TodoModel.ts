import {
    log,
    ActiveLogger,
} from "@springtype/springtype-incubator-core";

import {
    StateEffect,
    StateModel,
    StateModelLifecycle,
    StateReducer
} from "@springtype/springtype-incubator-state";
import {ITodoItem, ITodoState} from "../state/ITodoState";
import {IRootState} from "../state/IRootState";
import {getPhantomId} from "../function/getPhantomId";

const initialTodos: Array<ITodoItem> = [{
    done: false,
    id: getPhantomId(),
    text: 'Bar'
}, {
    done: false,
    id: getPhantomId(),
    text: 'Toms'
}];

interface TodoModelReducers {
    onAddTodo(todoItem: ITodoItem): ITodoState;
    onRemoveTodo(todoItem: ITodoItem): ITodoState;
    onToggleTodo(todoItem: ITodoItem): ITodoState;
}

@StateModel("TodoModel")
export class TodoModel implements StateModelLifecycle<ITodoState, TodoModelReducers> {

    constructor(
        public initialState: ITodoState,
        public reducers: TodoModelReducers,
        protected logger: ActiveLogger,
    ) {
        initialState.todos = initialTodos;
    }

    @StateReducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {
        state.todos.push(todoItem);
        return state;
    }

    @StateReducer
    onRemoveTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {
        state.todos = state.todos.filter((currentTodoItem: ITodoItem) => currentTodoItem.id !== todoItem.id);
        return state;
    }

    @StateReducer
    onToggleTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        state.todos = state.todos.map((currentTodoItem: ITodoItem) => {
            if (currentTodoItem.id === todoItem.id) {
                currentTodoItem.done = !currentTodoItem.done;
            }
            return currentTodoItem;
        });

        return state;
    }

    @StateEffect
    async addTodo(todoItem: ITodoItem) {
        return this.reducers.onAddTodo(todoItem);
    }

    @StateEffect
    async toggleTodo(todoItem: ITodoItem) {
        return this.reducers.onToggleTodo(todoItem);
    }

    @StateEffect
    async removeTodo(todoItem: ITodoItem) {

        this.logger.log('Removing todoItem in 1000 ms...', todoItem);

        return new Promise<ITodoState>((resolve) => {
            setTimeout(() => {

                resolve(this.reducers.onRemoveTodo(todoItem));

                log('Removed todoItem', todoItem);

            }, 1000);
        });
    }

    static selectTodos(state: IRootState): Array<ITodoItem> {
        return state.TodoModel.todos;
    }
}