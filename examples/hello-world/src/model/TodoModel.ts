import {StateReducer} from "../../../../src/package/state";
import {StateEffect} from "../../../../src/package/state";
import {StateModel} from "../../../../src/package/state";
import {StateModelLifecycle} from "../../../../src/package/state/src/StateModelLifecycle";
import {ITodoItem, ITodoState} from "../state/ITodoState";
import {getPhantomId} from "../getPhantomId";
import {IRootState} from "../state/IRootState";

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
}

interface TodoModelEffects {
    addTodo(todoItem: ITodoItem): Promise<ITodoState>;
}

interface TodoModelEffectsDispatcher {
    onAddTodo(todoItem: ITodoItem): ITodoState;
}

@StateModel("TodoModel")
export class TodoModel implements StateModelLifecycle, TodoModelReducers, TodoModelEffects {

    constructor(
        public initialState: ITodoState,
        public effects: TodoModelEffectsDispatcher,
    ) {

        // set initial initialState
        initialState.todos = initialTodos;
    }

    @StateReducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        // generate a new state
        state.todos = [
            ...state.todos,
            todoItem
        ];
        return state;
    }

    @StateEffect
    async addTodo(todoItem: ITodoItem) {

        // dispatch the action (calls the state reducer)
        return this.effects.onAddTodo(todoItem);
    }

    static selectTodos(state: IRootState): Array<ITodoItem> {
        return state.TodoModel.todos;
    }
}