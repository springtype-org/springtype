import {StateReducer} from "../../../../src/package/state";
import {StateEffect} from "../../../../src/package/state";
import {StateModel} from "../../../../src/package/state";
import {StateModelLifecycle} from "../../../../src/package/state/src/StateModelLifecycle";
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
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;

    onToggleTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;

    onRemoveTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;
}

interface TodoModelEffects {
    addTodo(todoItem: ITodoItem): Promise<ITodoState>;

    toggleTodo(todoItem: ITodoItem): Promise<ITodoState>

    removeTodo(todoItem: ITodoItem): Promise<ITodoState>;
}

interface TodoModelEffectsDispatcher {
    onAddTodo(todoItem: ITodoItem): ITodoState;

    onRemoveTodo(todoItem: ITodoItem): ITodoState;

    onToggleTodo(todoItem: ITodoItem): ITodoState;
}

@StateModel("TodoModel")
export class TodoModel implements StateModelLifecycle, TodoModelReducers, TodoModelEffects {

    constructor(
        public initialState: ITodoState,
        public effects: TodoModelEffectsDispatcher,
    ) {

        // set initial initialState
        initialState.change = Date.now();
        initialState.todos = initialTodos;
    }

    @StateReducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        state.change = Date.now();
        // generate a new state
        state.todos = [
            ...state.todos,
            todoItem
        ];
        return state;
    }

    @StateReducer
    onRemoveTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        state.change = Date.now();
        state.todos = state.todos
            .filter(
                (currentTodoItem: ITodoItem) =>
                    currentTodoItem.id !== todoItem.id
            );

        return state;
    }

    @StateReducer
    onToggleTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        state.change = Date.now();
        todoItem.done = !todoItem.done;
        return state;
    }

    @StateEffect
    async addTodo(todoItem: ITodoItem) {

        // dispatch the action (calls the state reducer)
        return this.effects.onAddTodo(todoItem);
    }

    @StateEffect
    async toggleTodo(todoItem: ITodoItem) {

        // dispatch the action (calls the state reducer)
        return this.effects.onToggleTodo(todoItem);
    }

    @StateEffect
    async removeTodo(todoItem: ITodoItem) {

        return new Promise<ITodoState>((resolve) => {
            setTimeout(() => {
                // dispatch the action (calls the state reducer)
                resolve(this.effects.onRemoveTodo(todoItem));
            }, 1000);
        });
    }

    static selectTodos(state: IRootState): ITodoState {
        return {
            todos: state.TodoModel.todos,
            change: state.TodoModel.change
        }

    }
}