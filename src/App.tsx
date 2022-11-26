import './App.scss';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
const App = () => {
    // const dispatch: AppDispatch = useAppDispatch();
    // const {projects, isLoading, error, currentProject} = useAppSelector(state => state.project)
    // const {changeTodoIsDone, setCurrentProject} = todoSlice.actions;
    
    // const [newTodoTitle, setNewTodoTitle] = useState('');
    // const [currentProject, setCurrentProject] = useState(projects[0] as IProject);
    
    // useEffect( () => {
    //          dispatch(fetchUsers())
    // }, [])

    // const handlerAddNewTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //
    //     setProjects([...todos, {id: Date.now(), title: newTodoTitle, is_done: false, project_id: 1}])
    //     setNewTodoTitle('')
    // }

    
    return (
        <div className="App">
            <Header />
            <div className="content">
                <Sidebar />
                <Main />
            </div>
        </div>
    )
};

export default App;
