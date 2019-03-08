export interface ITodoRootState {
    TodoModel: ITodoState;
}

export interface ITodoState {
    todos: Array<ITodoItem>;
}

export interface ITodoItem {
    id: number;
    text: string;
    done: boolean;
}