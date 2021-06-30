// Define unique 'types' that will be used in App
export type Priority = 'low' | 'medium' | 'high';

export type Todo = {
    parentProject: string;
    priority: Priority;
    title: string;
    description: string;
    dueDate: Date;
    notes: string[];
    completed: boolean;
}

export type Project = {
    title: string;
    description: string;
    children: Todo[];
}