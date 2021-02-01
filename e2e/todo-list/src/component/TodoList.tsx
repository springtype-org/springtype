import { render, tsx, Ref } from "../../../../dist/index";
import { defaultTasks } from "../config/defaultTasks";
import { genTaskId } from "../function/genTaskId";
import { ITask } from "../interface/ITask";
import { AddTask } from "./AddTask";
import { Task } from "./Task";

import "./TodoList.scss";

export const TodoList = () => {
 
    // refs
    const taskRef: Ref = {};
    const taskListRef: Ref = {};
    const addTaskContainerRef: Ref = {};

    // state
    const tasks: Array<ITask> = defaultTasks;
    let editState: Partial<ITask> = {};
    let hasError = false;

    const getIndexForId = (id: string): number => {
        for (let i=0; i<tasks.length; i++) {
            if (tasks[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    const onRemoveTaskClick = (taskId: string) => {
        tasks.splice(getIndexForId(taskId), 1);
        updateTasks();
    }

    const onToggleTaskDone = (taskId: string, done: boolean) => {
        const taskIndex = getIndexForId(taskId);
        tasks[taskIndex].done = done;
        updateTasks();
    }

    const renderTasks = ()  => {
        return <fragment>
            {
                tasks.length === 0 ? (
                    <div id="nothing-to-do">Nothing to do :)</div>
                ) : (
                    tasks.map(task => <Task {...task} onRemove={onRemoveTaskClick} onToggle={onToggleTaskDone} />)
                )
            }
        </fragment>
    }

    const renderAddTask = () => {
        return <AddTask description={editState.description} hasError={hasError} onAddTaskClick={onAddTaskClick} taskRef={taskRef} onDescriptionChange={(description: string) => {
            editState.description = description;
        }} />
    }

    const updateTasks = () => {
        taskListRef.current.innerHTML = '';
        render(renderTasks(), taskListRef.current);
    }

    const updateAddTask = () => {
        addTaskContainerRef.current.innerHTML = '';
        render(renderAddTask(), addTaskContainerRef.current);
    }

    const onAddTaskClick = () => {

        const description = (taskRef.current as HTMLInputElement).value;

        hasError = !description;
        updateAddTask();
        
        if (hasError) return;

        tasks.push({
            id: genTaskId(),
            done: false,
            description
        });

        (taskRef.current as HTMLInputElement).value = '';

        updateTasks();
    }

    return <fragment>
        <h1>TODO List</h1>

        <div class="taskList" ref={taskListRef}>
            { renderTasks() }
        </div>

        <div ref={addTaskContainerRef}>
           { renderAddTask() }
        </div>

    </fragment>
}