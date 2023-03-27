import jsonwebtoken from "jsonwebtoken";
import massDataModule from '../model/Mongoose.js'

const key = "imSecret";

export const CreateToken = async(req,res) => {
    const [userName,rcvdpassword]=[req.body.uname,req.body.password]
    console.log(req.body)
    const data=await massDataModule.findOne({uname:userName,password:rcvdpassword})
    if(data!==null){
        const token = jsonwebtoken.sign({}, key);
        res.status(200).json({
          message: "Lets goooo....",
          token: token,
        });
    }
    else {
        res.status(401).send({message:'Please enter valid credentials.'})
    }
};

export const Athenticate = (req, res, next) => {
  const rcvdToken = req.body.token;
  try {
    let result=jsonwebtoken.verify(rcvdToken, key);
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

export const ReturnUserData=async(req,res)=>{
    const [userName,rcvdpassword]=[req.body.uname,req.body.password]
    const data=await massDataModule.findOne({uname:userName,password:rcvdpassword})
    res.status(200).json(data)
}

export const UpdateUserData=async(req,res)=>{
  const filter={uname:req.body.uname}
  let tempData=req.body.tempData
  console.log(tempData.skillset)
  let updatArr=Object.entries(tempData).filter(([key,val])=> val!==null && val!=='' && val)
  tempData=Object.fromEntries(updatArr)
  const update={
    $set:{...tempData}
  }

  await massDataModule.findOneAndUpdate(filter,update)
  .then(()=>{
    res.status(200)
    console.log('updated')})
  .catch(err=>console.log(err))
}

export const UpdateImpCred = async(req,res)=>{
  const filter={uname:req.body.uname}
  const update={$set:req.body.newCrwd}
  console.log(req.body.newCred)
  await massDataModule.findOneAndUpdate(filter,update)
  .then(()=>{
    res.status(200)
    console.log('updated username and password')})
  .catch(err=>console.log(err))
}