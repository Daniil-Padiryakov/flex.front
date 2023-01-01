import { ITodo } from './ITodo'

export interface IProject {
    id: number
    title: string
    todos: ITodo[]
    user_id: number
}
