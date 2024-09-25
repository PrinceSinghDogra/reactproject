const express = require ("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb+srv://PrinceSinghDogra:1234@authdb.dj94yhv.mongodb.net/princesinghdogra100",{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("student database is connected");
}).catch((error)=>{console.log("error is coming ",error)});
const connection = mongoose.connection;
const studentDetail = new mongoose.Schema({
    lName: {
        type: String,
        required: true,
    },
    fName: {
        type:String,
        required:true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
    },
    fatherName:{
        type:String,
        required:true,
    },
    motherName:{
        type:String,
        required:true,
    },
    hostleName:{
        type:String,
        required:true,
    },
    roomNumber:{
        type:String,
        required:true,
    },
    adminName:{
        type:String,
        required:true,
    },
    setPassword:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
   
});
const gatekeeperDetail = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    enrollmentNumber:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    },
    hostleName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    adminName:{
        type:String,
        required:true,
    }
});
const AdminDetail = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    enrollmentNumber:{
        type:String,
        required:true,
    },
    secretKey:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});
const studentdetail = connection.model('studentDetail',studentDetail);
const gatekeeperdetail = connection.model('gatekeeperDetail',gatekeeperDetail);
const admindetail = connection.model('adminDetail',AdminDetail);
app.post('/studentregister',async(req,res)=>{
    console.log(req.body);
    const {fName,lName,rollNumber,email,fatherName,motherName,hostleName,roomNumber,adminName,setPassword,confirmPassword,phoneNumber} = req.body;
    const value = new studentdetail(req.body);
    if(!lName||!fName||!rollNumber||!email||!fatherName||!motherName||!hostleName||!roomNumber||!adminName||!setPassword||!confirmPassword||!phoneNumber)
    {
        console.log("Any column is left empty");
        res.send("Please fill all the details.");
    }

    await studentdetail.findOne({email:email}).then((existinguser)=>{
        if(existinguser){

        console.log("the credential already exist");
        res.send("These credential already exist.");}
        else{
            value.save().then(()=>{
                res.send("the data is saved");
            }).catch((e)=>{
                console.log("their is error",e);
                res.status(422).send("the data is not saved",e);
            })
        }
    })
})
app.post('/gatekeeperregister',async(req,res)=>{
  console.log(req.body);
  const {name,email,enrollmentNumber,password,confirmPassword,hostleName,phoneNumber,adminName}=req.body;
  const value = new gatekeeperdetail(req.body);
  if(!name||!email||!enrollmentNumber||!password||!confirmPassword||!hostleName||!phoneNumber||!adminName){
    console.log("Please fill all the credentials.");
    res.send("Please fill all the credentials.");
  }
  const existinguser = await gatekeeperdetail.findOne({email:email})
    if(existinguser){

    console.log("the credential already exist");
    res.send("These credential already exist.");}
    else{
        value.save().then(()=>{
            console.log("the data is saved of gatekeeper.")
             res.send("The data is saved.")   
            
        })
    }
})
app.post('/adminregister',async(req,res)=>{
  console.log(req.body);
  const {email,enrollmentNumber,secretKey,password}= req.body;
  if(secretKey==="ABC"){
    console.log("ABC is matched.");
    const value = new admindetail(req.body);
    console.log("the admindetail");
    if(!email||!enrollmentNumber||!secretKey||!password){
        console.log("Any field is left empty");
        res.send("Any field is left empty.");
    }else{
    await admindetail.findOne({email:email}).then((existingcredential)=>{
        if(existingcredential){
            console.log("the data is present.");
            res.send("The credential already exist.");
        }else{
            value.save().then(()=>{
                console.log("the value is saved.");
                res.send("The data is saved");
            })
        }
       
  }) 
  } 
    }
})
app.post('/studentlogin',async(req,res)=>{
    console.log(req.body);
    const {rollNumber,password,email} = req.body;
    const user = await studentdetail.findOne({
        email:email,
    
       
    });
    console.log(user);
    if(user){
        res.send("Authenticated");

    }
    else{
        console.log(user);
        res.send("Not Authenticated");
    }
})
app.post('/adminlogin',async(req,res)=>{
    console.log(req.body);
    const {email,password,secretKey} = req.body;
    const user = admindetail.findOne({email:email,
        password:password,
        secretKey:secretKey,
    })
    if (user){
        console.log("Authenticated");
        res.send("Authenticated");
    }
    else{
        console.log("Not Authenticated");
        res.send("Not Authenticated");
    }

})
app.post('/gatekeeperlogin', async (req,res)=>{
        console.log(req.body);
        const {email,enrollmentNumber,password} = req.body;
        const user = gatekeeperdetail.findOne({email:email,
                                               enrollmentNumber:enrollmentNumber,
                                               password:password,
        })
        if(user){
            console.log("Authenticated");
            res.send("Authenticated");
        }
        else{
            console.log("Not Autheticated");
            res.send("Not Authenticated");
        }
})
app.listen(3001);