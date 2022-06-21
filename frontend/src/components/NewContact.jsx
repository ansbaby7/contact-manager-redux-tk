import { Alert, AlertIcon, CircularProgress } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createContact, updateContact } from "../features/contactsSlice";

const NewContact = ({ contact, setContact }) => {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.contactsState);

  const handleSubmit = (event) => {
    event.preventDefault();

    // if the contact already have an id, we perform the update operation
    // otherwise add the contact as a new one
    if (contact._id) {
      dispatch(updateContact(contact));
    } else {
      dispatch(createContact(contact));
    }

    setContact({
      contactName: "",
      phone: "",
      email: "",
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="border border-black p-4 m-4">
          <label>Name: </label>
          <input
            className="mr-3 pl-1"
            type="text"
            placeholder="Enter name..."
            value={contact.contactName}
            onChange={(event) =>
              setContact({ ...contact, contactName: event.target.value })
            }
          />
          <label>Phone: </label>
          <input
            className="mr-3 pl-1"
            type="text"
            placeholder="Enter phone..."
            value={contact.phone}
            onChange={(event) =>
              setContact({ ...contact, phone: event.target.value })
            }
          />
          <label>Email: </label>
          <input
            className="mr-3 pl-1"
            type="text"
            placeholder="Enter email..."
            value={contact.email}
            onChange={(event) =>
              setContact({ ...contact, email: event.target.value })
            }
          />
          {contactsState.createContactStatus === "pending" ? (
            <div className="flex justify-center">
              <CircularProgress isIndeterminate color="blue.300" />
            </div>
          ) : (
            <button
              type="submit"
              className="block text-gray-50 bg-blue-500 mx-auto mt-3 mb-2 py-1 px-2 text-xl"
            >
              {contact._id ? "UPDATE" : "ADD CONTACT"}
            </button>
          )}

          {/* showing alerts or messages */}
          {contactsState.createContactStatus === "rejected" ? (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
            </Alert>
          ) : null}
          {contactsState.createContactStatus === "success" ? (
            <Alert status="success">
              <AlertIcon />
              Contact added successfully...
            </Alert>
          ) : null}

          {contactsState.updateContactStatus === "rejected" ? (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
            </Alert>
          ) : null}
          {contactsState.updateContactStatus === "success" ? (
            <Alert status="success">
              <AlertIcon />
              Contact updated successfully...
            </Alert>
          ) : null}

          {contactsState.deleteContactStatus === "rejected" ? (
            <Alert status="error">
              <AlertIcon />
              There was an error processing your request
            </Alert>
          ) : null}
          {contactsState.deleteContactStatus === "success" ? (
            <Alert status="success">
              <AlertIcon />
              Contact deleted successfully...
            </Alert>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default NewContact;
