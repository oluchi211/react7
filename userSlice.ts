import { createSlice, PayloadAction,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export interface User{
    id:number;
    name:string;
    email:string;
    address: {street: string; city: string; };
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users:[],
    loading: false,
    error: null,

    };
export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async()=> {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data as User[]
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
        addUser:(state, action:PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        deleteUser:(state, action:PayloadAction<number>) => {
            state.users = state.users.filter(user =>  user.id !== action.payload);
        },
        updateUser:(state, action:PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index!== -1){state.users[index]= action.payload;}
        }
    },

extraReducers:(builder) => {
    builder
    .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
    })

    .addCase(fetchUsers.fulfilled,(state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action. error.message ||"failed to fetch users";
    });
}
});
export const{addUser, deleteUser, updateUser}= userSlice.actions;
export default userSlice.reducer;