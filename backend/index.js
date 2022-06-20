const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./routes/contacts");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/contacts",contactRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to the Contacts Manager API");
});



mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to the database");
        app.listen(process.env.PORT,()=>{
            console.log(`Server running on port: ${process.env.PORT}`)
        })
    })
    .catch((err)=>{
        console.log(err);
    })

