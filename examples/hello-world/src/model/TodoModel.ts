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
    addTodo(todoItem: ITodoItem): Promise<ITodoState>;
}

interface ITodoModelEffectsDispatcher {
    onAddTodo(todoItem: ITodoItem): ITodoState;
}

@StateModel("TodoModel")
export class TodoModel implements IStateModelLifecycle, ITodoModelReducers, ITodoModelEffects {

    constructor(
        public initialState: ITodoState,
        public effects: ITodoModelEffectsDispatcher,
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
        return this.effects.onAddTodo(todoItem);
    }

    static selectTodos(state: IRootState): Array<ITodoItem> {
        return state.TodoModel.todos;
    }
}