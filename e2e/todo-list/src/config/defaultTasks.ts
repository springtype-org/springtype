import { genTaskId } from "../function/genTaskId";
import { ITask } from "../interface/ITask";

export const defaultTasks: Array<ITask> = [{
    id: genTaskId(),
    done: false,
    description: 'Finish framework'
}];