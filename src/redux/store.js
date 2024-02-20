import { configureStore } from "@reduxjs/toolkit";
import githubUserReducer from "./reducers/githubUserReducer";

const store = configureStore({
    reducer: {
        user: githubUserReducer
    }
})

export default store;