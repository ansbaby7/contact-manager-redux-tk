import ContactsList from "./components/ContactsList";
import NewContact from "./components/NewContact";
import {ChakraProvider} from "@chakra-ui/react"
import { useState } from "react";


const App = () => {

  const [contact, setContact] = useState({
    contactName: "",
    phone: "",
    email: "",
  });

  return (
    <ChakraProvider>
    <div className="App">
      <h1 className="w-full text-center py-2 text-4xl">Manage Your Contacts</h1>
      <NewContact contact={contact} setContact={setContact}/>
      <ContactsList setContact={setContact}/>
    </div>
    </ChakraProvider>
  )
}

export default App;
