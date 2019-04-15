import { StatefulLifecycle } from "@springtype/springtype-incubator-state";
import { IRootState } from "../state/IRootState";
import { ITodoItem } from "../state/ITodoState";
export declare class TodoService implements StatefulLifecycle {
    state: IRootState;
    constructor(state: IRootState);
    getById(id: number): ITodoItem;
}
