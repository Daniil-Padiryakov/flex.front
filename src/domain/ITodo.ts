export interface ITodo {
    id: number
    title: string
    is_done: boolean
    parent_id: number
    project_id: number
    children?: ITodo[]
    depth?: number
}