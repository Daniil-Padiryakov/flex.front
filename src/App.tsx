import './App.scss';
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import Auth from "./pages/Auth";
import {useEffect} from "react";
import {AppDispatch, useAppDispatch, useAppSelector} from "./store/store";
import {checkAuth} from "./store/reducers/thunks/auth";

const App = () => {
    const dispatch: AppDispatch = useAppDispatch();
    // const {} = useAppSelector(state => state.auth)
    // const {} = authSlice.actions;
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
        // dispatch(checkAuth())
    }, [])
    
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/auth" element={<Auth />}></Route>
            </Routes>
        </div>
    )
};

export default App;
