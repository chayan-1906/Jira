import {DataKanbanProps} from "@/types";
import {Task, TaskStatus} from "@/features/tasks/types";
import {useState} from "react";
import {DragDropContext} from "@hello-pangea/dnd";
import KanbanColumnHeader from "@/features/tasks/components/kanban-column-header";

const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
];

type TasksState = {
    [key in TaskStatus]: Task[];
}

function DataKanban({data}: DataKanbanProps) {
    const [tasks, setTasks] = useState<TasksState>(() => {
        const initialTasks: TasksState = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        };

        data.forEach((task) => {
            initialTasks[task.status].push(task);
        });

        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatus].sort((a, b) => a.position - b.position);
        });

        return initialTasks;
    });

    return (
        <div>
            <DragDropContext onDragEnd={() => {
            }}>
                <div className={'flex overflow-x-auto'}>
                    {boards.map((board) => {
                        return (
                            <div key={board} className={'flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]'}>
                                <KanbanColumnHeader board={board} taskCount={tasks[board].length}/>
                            </div>
                        );
                    })}
                </div>
            </DragDropContext>
        </div>
    );
}

export default DataKanban;
