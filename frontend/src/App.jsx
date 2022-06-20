import ContactsList from "./components/ContactsList";
import NewContact from "./components/NewContact";



const App = () => {

  return (
    <div className="App">
      <h1 className="w-full text-center py-2 text-4xl">Manage Your Contacts</h1>
      <NewContact/>
      <ContactsList/>
    </div>
  )
}

export default App;
