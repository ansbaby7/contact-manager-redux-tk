const express = require("express");
const Contact = require("../models/contactModel");

// create an instance of express Router
const router = express.Router();

// get all contacts
router.get("/",async(req,res)=>{
    try{
        // get contacts in sorted order (recently added contact comes first)
        const contacts = await Contact.find().sort({createdAt:-1});
        res.status(200).json(contacts);
    }catch(err){
        res.status(500).json({Error:err.message});

    }
})

// create a new contact
router.post("/",async(req,res)=>{
    const {contactName,phone,email} = req.body;

    try{
        const newContact = new Contact({contactName,phone,email});
        const savedContact = await newContact.save();
        res.status(200).json(savedContact);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
})

// update a contact
router.put("/:id",async(req,res)=>{
    const {contactName,phone,email} = req.body;
    try{
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            {contactName,phone,email},
            {new:true}  // so that updated document (and not the original) is returned
        );
        res.status(200).json(updatedContact);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
})

//delete a contact
router.delete("/:id",async(req,res)=>{
    try{
        const deletedContact = await findByIdAndDelete(req.params.id);
        res.status(200).json(deletedContact);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
})

module.exports = router;