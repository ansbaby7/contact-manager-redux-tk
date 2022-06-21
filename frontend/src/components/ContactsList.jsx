import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../features/contactsSlice";

const ContactsList = () => {
  const dispatch = useDispatch();
  const contactsState = useSelector((state) => state.contactsState);
  const { contacts } = contactsState;

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-center">{contacts && contacts.length} Contacts</h2>
      <div className="flex justify-center">
        <h1 className="my-4 uppercase text-3xl font-bold">Contact List</h1>
      </div>
      <div className="grid grid-cols-4">
        {contactsState.getContactsStatus === "pending" ? "Loading..." : null}
        {contacts.map((contact) => {
          return (
            <div className="border-2 p-2 m-2">
              <h3 className="text-lg">
                Name: <span>{contact.contactName}</span>
              </h3>
              <h3 className="text-lg">
                Phone: <span>{contact.phone}</span>
              </h3>
              <h3 className="text-lg">
                Email: <span>{contact.email}</span>
              </h3>
              <div className="mb-1 mt-2 flex justify-start gap-x-3">
                <button className="uppercase bg-blue-600 py-1 px-2 text-gray-100 text-lg">Update</button>
                <button className="uppercase bg-red-600 py-1 px-2 text-gray-100 text-lg">Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsList;
