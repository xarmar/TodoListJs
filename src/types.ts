import { Todo } from "./todo";

// Define unique 'types' that will be used in App
export type Priority = 'low' | 'medium' | 'high';

export type ProjectType = {
    title: string;
    children: Todo[];
}