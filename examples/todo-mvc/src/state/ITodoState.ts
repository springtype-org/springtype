export interface ITodoRootState {
    TodoModel: ITodoState;
}

export interface ITodoState {
    todos: Array<ITodoItem>
    change: number
}

export interface ITodoItem {
    id: number;
    text: string;
    done: boolean;
}