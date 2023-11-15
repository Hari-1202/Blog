import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user/userReducer";


const store = configureStore({
    reducer: {
        userReducer
    }
})

export default store