import {StateReducer} from "../../../../src/package/state";
import {StateEffect} from "../../../../src/package/state";
import {StateModel} from "../../../../src/package/state";
import {IStateModelLifecycle} from "../../../../src/package/state/src/IStateModelLifecycle";
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

interface ITodoModelReducers {
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;
}

interface ITodoModelEffects {
    onAddTodo(todoItem: ITodoItem): ITodoState;
}

@StateModel("TodoModel")
export class TodoModel implements IStateModelLifecycle, ITodoModelReducers {

    constructor(
        public initialState: ITodoState,
        public effects: ITodoModelEffects,
    ) {

        // set initial initialState
        initialState.todos = initialTodos;
    }

    @StateReducer
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState {

        state.todos = [
            ...state.todos,
            todoItem
        ];
        return state;
    }

    @StateEffect
    async addTodo(todoItem: ITodoItem) {
        this.effects.onAddTodo(todoItem);
    }

    static selectTodos(state: IRootState) {
        return state.TodoModel.todos;
    }
}