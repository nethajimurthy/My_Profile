import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import mongoose from 'mongoose'
import massDataModule from "./model/Mongoose.js";
import { CreateToken, Athenticate, ReturnUserData, UpdateUserData, UpdateImpCred } from "./controller/Controller.js";

const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))


const PORT = 5000;
const dataBase='mongodb+srv://nethajinandhu007:9845762531@cluster0.rakzzlv.mongodb.net/myprofiledata'

mongoose
  .connect(dataBase, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.post('/register',async(req,res)=>{
    console.log(req.body)
    const newProfileData=new massDataModule(req.body)
    try{
      await newProfileData.save().then(()=>console.log('saved new data '))
    }
    catch(err){console.log(err)}
})

app.post('/login',CreateToken)

app.post('/myprofile',Athenticate,ReturnUserData)

app.post('/myprofile/updatebasic',Athenticate,UpdateUserData)

app.post('/myprofile/updateimpcred',Athenticate,UpdateImpCred)