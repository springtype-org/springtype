import { render, Props } from "../../../../dist/index";

import { ITask } from "../interface/ITask"
import "./Task.scss";

export interface ITaskProps extends Props, ITask {
    onRemove: (taskId: string) => void;
    onToggle: (taskId: string, done: boolean) => void;
}

export const Task = ({ id, done, description, onRemove, onToggle }: ITaskProps) => {

    const onChange = (evt: InputEvent) =>  onToggle(id, (evt.target as HTMLInputElement).checked); 

    return <div class="task">
        <input type="checkbox" checked={done} onChange={onChange} /> 
        { description } 
        <button name="remove" onClick={() => onRemove(id)}>🗑️</button>
    </div>
}
