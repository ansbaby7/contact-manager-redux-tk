const ContactCard = ({contact}) => {
    return <div className="border-2 p-2">
        <h3 className="text-lg">Name: <span>contact.contactName</span></h3>
        <h3 className="text-lg">Phone: <span>contact.phone</span></h3>
        <h3 className="text-lg">Email: <span>contact.email</span></h3>
    </div>
}

export default ContactCard;