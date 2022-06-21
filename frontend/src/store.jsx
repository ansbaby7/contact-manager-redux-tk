import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./features/contactsSlice";

const store = configureStore({
    reducer:{
        contactsState: contactsReducer
    }
})

export default store;