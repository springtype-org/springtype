import { render, Props, Ref } from "../../../../dist/index";

export interface AddTaskProps {
    taskRef: Ref;
    hasError: boolean;
    description: string;
    onAddTaskClick: () => void;
    onDescriptionChange: (description: string) => void;
}

export const AddTask = ({ taskRef, hasError, description, onAddTaskClick, onDescriptionChange }: AddTaskProps) => {

    const onChange = (evt: InputEvent) => {
        onDescriptionChange((evt.target as HTMLInputElement).value);
    }

    return <fragment>
        <h2>Add a task</h2>
        Task: <input name="description" type="text" ref={taskRef} onChange={onChange} value={description}></input><br />
        
        {hasError ? <span class="errorMessage">Description must be entered.<br /></span> : <fragment />}

        <button name="add" onClick={onAddTaskClick}>➕</button>
    </fragment>
}