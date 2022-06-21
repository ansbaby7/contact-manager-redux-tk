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

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiURL + "contacts");
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (contact, { rejectWithValue }) => {
    try {
      const { _id, contactName, phone, email } = contact;
      const response = await axios.put(apiURL + "contacts/" + _id, {
        contactName,
        phone,
        email,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async(_id,{rejectWithValue}) => {
    try{
      const response = await axios.delete(apiURL+"contacts/"+_id)
      return response.data
    }catch(err){
      console.log(err);
      return rejectWithValue(err.response.data)
    }
  }
)

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: {
    // create new contact - post request
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
      };
    },
    [createContact.fulfilled]: (state, action) => {
      return {
        ...state,
        contacts: [action.payload, ...state.contacts], //action.payload contains the newly added contact
        createContactStatus: "success",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },
    [createContact.rejected]: (state, action) => {
      return {
        ...state,
        createContactStatus: "rejected",
        createContactError: action.payload,   // rejectWithValue
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },

    // get all contacts - get request
    [getContacts.pending]: (state, action) => {
      return {
        ...state,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "pending",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },
    [getContacts.fulfilled]: (state, action) => {
      return {
        ...state,
        contacts: action.payload, // action.payload contains the array of contacts fetched
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "success",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },
    [getContacts.rejected]: (state, action) => {
      return {
        ...state,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "rejected",
        getContactsError: action.payload,    // rejectWithValue
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },

    // update contact - put request
    [updateContact.pending]: (state, action) => {
      return {
        ...state,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "pending",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },
    [updateContact.fulfilled]: (state, action) => {
      const updatedContacts = state.contacts.map((contact) =>
        contact._id === action.payload._id ? action.payload : contact
      );
      return {
        ...state,
        contacts: updatedContacts,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "success",
        updateContactError: "",
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },
    [updateContact.rejected]: (state, action) => {
      return {
        ...state,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "rejected",
        updateContactError: action.payload,   // rejectWithValue
        deleteContactStatus: "",
        deleteContactError: "",
      };
    },

    // delete contact - delete request
    [deleteContact.pending]: (state, action) => {
      return {
        ...state,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "pending",
        deleteContactError: "",
      };
    },
    [deleteContact.fulfilled]: (state, action) => {
      // currentContacts will contain contacts after deleting the contact
      const currentContacts = state.contacts.filter((contact) =>
        contact._id !== action.payload._id
      );
      return {
        ...state,
        contacts: currentContacts,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",
        deleteContactStatus: "success",
        deleteContactError: "",
      };
    },
    [deleteContact.rejected]: (state, action) => {
      return {
        ...state,
        createContactStatus: "",
        createContactError: "",
        getContactsStatus: "",
        getContactsError: "",
        updateContactStatus: "",
        updateContactError: "",  
        deleteContactStatus: "rejected",
        deleteContactError: action.payload,  // rejectWithValue
      };
    },
  },
});

export default contactsSlice.reducer;
