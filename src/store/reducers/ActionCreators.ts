import {AppDispatch} from "../store";
import axios from "axios";
import {IProject} from "../../domain/IProject";
import {projectSlice} from "./ProjectSlice";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(projectSlice.actions.usersFetching())
        const response = await axios.get<IProject[]>('http://localhost:5010/project')
        dispatch(projectSlice.actions.usersFetchingSuccess(response.data))
    } catch (e) {
        if (e instanceof Error)
        dispatch(projectSlice.actions.usersFetchingError(e.message))
    }
}