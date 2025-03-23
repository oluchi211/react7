import React, { useState } from "react";
import { deleteUser} from '../store/userSlice';
import { useDispatch} from "react-redux";
import UserForm from "./UserForm";


export interface User {
    id: number;
    name: string;
    email: string;
    address:{
        street:string;
        city: string;
    };
}

interface UserCardProps {
    user: User;
}

const UserCard: React.FC<UserCardProps> = ({user}) => {
    const dispatch = useDispatch();
    const[editing, setEditing] = useState(false);

    const handleDelete = () => {
        dispatch(deleteUser(user.id));
    };


return(
    <div>
        {editing? (
            <UserForm existingUser={user} onclose={() => setEditing(false)}/>
        ):(
            <>
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
        <p>
            Address: {user.address.street}, {user.address.city}
            </p>
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        </>
        )}
    </div>
);
};

export default UserCard;