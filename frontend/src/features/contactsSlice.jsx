import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    contacts : [],
    createContactStatus: "",
    createContactError: "",
    getContactsStatus: "",
    getContactsError: "",
    updateContactStatus: "",
    updateContactError: "",
    deleteContactStatus: "",
    deleteContactError: ""
}

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: {}
});

export default contactsSlice.reducer