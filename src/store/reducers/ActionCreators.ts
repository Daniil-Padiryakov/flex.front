import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITodo} from "../../domain/ITodo";

export const fetchTodos = createAsyncThunk(
    'todo/fetchAll',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            const response = await axios.get<ITodo[]>('http://localhost:5010/todo')
            
            return response.data;
        } catch (e) {
            return rejectWithValue("Cannot get list of todos")
        }
    }
)

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (newTodo: ITodo, thunkAPI) => {
        // console.log(newTodo)
        try {
            const response = await axios.post<ITodo>('http://localhost:5010/todo', newTodo)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Cannot create todo")
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (payload: any, thunkAPI) => {
        console.log(payload)
        const {id, idForDelete} = payload;
        const params = idForDelete.join(',');
        try {
            console.log('asdasd')
            const response = await axios.delete<any>(`http://localhost:5010/todo/${params}`)
            const result = response.data;
            
            result.id = idForDelete;
            return result;
        } catch (e) {
            return thunkAPI.rejectWithValue("Cannot delete todo")
        }
    }
)