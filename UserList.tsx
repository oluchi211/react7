import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchUsers} from "../store/userSlice";
import { RootState,AppDispatch } from '../store/store';
import UserCard from './UserCard';



const UserList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {users, loading} = useSelector((state: RootState) => state.users);
        
    useEffect(() => {
        dispatch(fetchUsers()); 
    }, [dispatch]);
    
if (loading) return<p>loading</p>;


return(
    <div>
        {users.map((user) => (
            <UserCard key={user.id} user={user}/>
        ))}
        
    </div>
);
};
export default UserList;