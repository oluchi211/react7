
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";


    function App(){
        const handleClose = () => {
            console.log("form closed");
        };
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/add-user" element={<UserForm onclose={handleClose}/>} />
                <Route path="/edit-user/:id" element={<UserForm onclose={handleClose}/>}/>
            </Routes>
        </Router>
    );
};

export default App;
