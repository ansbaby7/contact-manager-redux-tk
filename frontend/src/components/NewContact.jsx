import { useState } from "react";

const NewContact = () => {
  const [contactName, setContactName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setContactName("");
  };

  return (
    <>
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="border border-black p-4 m-4">
        <label>Name: </label>
        <input
          type="text"
          placeholder="Enter name..."
          value={contactName}
          onChange={(event) => setContactName(event.target.value)}
        />
        <button type="submit" className=" text-gray-50 bg-blue-500 p-2">ADD</button>
      </form>
      </div>
    </>
  );
};

export default NewContact;
