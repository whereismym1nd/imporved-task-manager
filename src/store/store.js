import { configureStore } from "@reduxjs/toolkit";
import reducer from "../components/daily-todos/daily-todo-slice"

const store = configureStore({
    reducer: {
        todos: reducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;