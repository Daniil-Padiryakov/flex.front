import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITodo} from "../../domain/ITodo";

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

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (newTodo: ITodo, thunkAPI) => {
        console.log(newTodo)
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
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.delete<any>(`http://localhost:5010/todo/${id}`)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Cannot delete todo")
        }
    }
)