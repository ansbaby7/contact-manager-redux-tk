import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "http://localhost:5000/api/";

const initialState = {
  contacts: [],
  createContactStatus: "",
  createContactError: "",
  getContactsStatus: "",
  getContactsError: "",
  updateContactStatus: "",
  updateContactError: "",
  deleteContactStatus: "",
  deleteContactError: "",
};

export const createContact = createAsyncThunk(
  "contacts/createContact",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiURL + "contacts", contact);
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: {
    [createContact.pending]: (state, action) => {
      return {
        ...state,
        createContactStatus: "pending",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      }
    },
    [createContact.fulfilled]: (state,action)=>{
        return{
        ...state,
        contacts: [action.payload,...state.contacts],
        createContactStatus: "success",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
        }
    },
    [createContact.rejected]: (state,action)=>{
        return{
        ...state,
        createContactStatus: "rejected",
        createContactError: action.payload,
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
        }
    },

  },
});

export default contactsSlice.reducer;
