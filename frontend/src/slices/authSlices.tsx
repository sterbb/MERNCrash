import { createSlice } from "@reduxjs/toolkit";

// interface UserInfo{
// _id: string;
// name: string;
// email:string;
// password:string;
// }

// interface InitialState{
//     userInfo: UserInfo | null;
// }

//this is for local changes

const intialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null
};


const authSlice = createSlice({
    name: "auth",
    initialState: intialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload)); 
        },
        logout: (state,action) =>{
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {setCredentials, logout} = authSlice.actions

export default authSlice.reducer;