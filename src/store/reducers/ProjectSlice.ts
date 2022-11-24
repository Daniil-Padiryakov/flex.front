import {IProject} from "../../domain/IProject";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ProjectSliceState {
    projects: IProject[]
    isLoading: boolean
    error: string
    currentProject?: IProject
}

const initialState: ProjectSliceState = {
    projects: [],
    isLoading: false,
    error: '',
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        usersFetching(state) {
            state.isLoading = true;
            state.error = '';
        },
        usersFetchingSuccess(state, action: PayloadAction<IProject[]>) {
            state.projects = action.payload;
            state.currentProject = action.payload[0]
            state.error = '';
            state.isLoading = false;
        },
        usersFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        setCurrentProject(state, action: PayloadAction<IProject>) {
            state.currentProject = action.payload;
        },
        changeTodoIsDone(state, action: PayloadAction<number>) {
            const idTodo = action.payload;
            state.currentProject?.todos.map((todo) => {
                if (todo.id === idTodo) {
                    todo.is_done = !todo.is_done
                    return todo
                }
                return todo;
            })

            for (let i = 0; i < state.projects.length; i++) {
                if (state.projects[i].id === state.currentProject?.id) {
                    state.projects[i] = state.currentProject;
                }
            }
        }
    },
})

export default projectSlice.reducer;