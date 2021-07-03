// Define unique 'types' that will be used in App
export type Priority = 'low' | 'medium' | 'high';

export type TodoType = {
    parentProject: string;
    priority: Priority;
    title: string;
    description: string;
    dueDate: Date;
    notes: string[];
    completed: boolean;
}

export type ProjectType = {
    title: string;
    description: string;
    children: TodoType[];
}