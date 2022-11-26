import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITodo} from "../../domain/ITodo";

// export const fetchProjects = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(projectSlice.actions.usersFetching())
//         const response = await axios.get<IProject[]>('http://localhost:5010/project')
//         dispatch(projectSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e) {
//         if (e instanceof Error)
//         dispatch(projectSlice.actions.usersFetchingError(e.message))
//     }
// }

export const fetchTodos = createAsyncThunk(
    'todo/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITodo[]>('http://localhost:5010/todo')
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Cannot get list of todos")
        }
    }
)