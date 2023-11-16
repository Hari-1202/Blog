import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name: 'userReducer',
    initialState: {
        isLoggedIn: false,
        token: '',
        expiresIn: ''
    },
    reducers: {
        saveUserData: (state, action) => {
            return state = action.payload
        }
    }
})

export const {saveUserData} = userSlice.actions
export default userSlice.reducer