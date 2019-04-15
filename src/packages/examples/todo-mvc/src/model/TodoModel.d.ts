import { ActiveLogger } from "@springtype/springtype-incubator-core";
import { StateModelLifecycle } from "@springtype/springtype-incubator-state";
import { ITodoItem, ITodoState } from "../state/ITodoState";
import { IRootState } from "../state/IRootState";
interface TodoModelReducers {
    onAddTodo(todoItem: ITodoItem): ITodoState;
    onRemoveTodo(todoItem: ITodoItem): ITodoState;
    onToggleTodo(todoItem: ITodoItem): ITodoState;
}
export declare class TodoModel implements StateModelLifecycle<ITodoState, TodoModelReducers> {
    initialState: ITodoState;
    reducers: TodoModelReducers;
    protected logger: ActiveLogger;
    constructor(initialState: ITodoState, reducers: TodoModelReducers, logger: ActiveLogger);
    onAddTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;
    onRemoveTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;
    onToggleTodo(state: ITodoState, todoItem: ITodoItem): ITodoState;
    addTodo(todoItem: ITodoItem): Promise<ITodoState>;
    toggleTodo(todoItem: ITodoItem): Promise<ITodoState>;
    removeTodo(todoItem: ITodoItem): Promise<ITodoState>;
    static selectTodos(state: IRootState): Array<ITodoItem>;
}
export {};
