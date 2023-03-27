import mongoose from 'mongoose'

const mongoSchema=new mongoose.Schema({
    name:String,
    profession:String,
    description:String,
    skillset:Array(String),
    uname:String,
    image:{
        type:String,
        default:'https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255710-stock-illustration-avatar-vector-male-profile-gray.jpg'
    },
    password:String
})

const massDataModule = mongoose.model('myprofiledata',mongoSchema)  

export default massDataModule