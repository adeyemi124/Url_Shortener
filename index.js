const express = require("express")
const app = express()
const mongoose = require ("mongoose")
const urlRoutes = require("./routes/urlRoute")
require('dotenv').config()
const PORT = process.env.PORT || 5090

//! Connect to MongoDB
const URI = process.env.MONGO_URI
mongoose.connect(URI)
.then(()=>{
    console.log("Connected to Database")
}).catch((e)=>{
    console.log(`Error connecting to DB ${e}`)
})


  app.use(express.json());

  app.use('/', urlRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})