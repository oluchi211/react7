import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { addUser,updateUser } from "../store/userSlice";


 export interface User {
    id:number;
    name:string;
    email:string;
    address:{
        street: string
        city: string;
    };
 }

 interface UserFormProps {
    existingUser?: User;
    onclose: () => void;
 }


const UserForm: React.FC<UserFormProps> = ({existingUser, onclose}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(existingUser?.name || "");
    const [email, setEmail] = useState(existingUser?.email || "");
    const [street, setStreet] = useState(existingUser?.address.street|| "");
    const [city, setCity] = useState(existingUser?.address.city|| "");


useEffect(() => {
    if(existingUser) {
        setName(existingUser.name);
        setEmail(existingUser.email);
        setStreet(existingUser.address.street);
        setCity(existingUser.address.city);
    }
},[existingUser]);

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
        
    const user: User = {
        id: existingUser?.id || Date.now(),
        name,
        email,
        address:{street,city},
    };

    if(existingUser){
        dispatch(updateUser(user));
    }else{
        dispatch(addUser(user));
    }
    onclose();
};
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="Name" onChange={(e) => setName( e.target.value)}
                required
                />
            </div>
            <div>
                <input type="email" placeholder="email"  onChange={(e) => setEmail( e.target.value)}
                required
                />
                </div>

                 <div>
                <input type="text" placeholder="street"  onChange={(e) => setStreet(e.target.value )}               
                required
                />
                </div>
                 <div>
                <input type="text" placeholder="city" onChange={(e) => setCity( e.target.value)}
                
                required
                />
                </div>
                <button type="submit">{existingUser ? 'Update User': 'Add User'}</button>
            </form>
        </div>
    );
};
 export default UserForm;