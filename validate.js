const express = require('express')
const validate = express();
var bodyParser=require("body-parser");
const {MongoClient}=require('mongodb');
const url = 'mongodb://0.0.0.0:27017/travel';
const client = new MongoClient(url);
const db_name='travelRegister';
const app=express()
const port=3000
app.use(express.static('Public'))
const host_path={root:__dirname+'/Public/files/'}
//static path:the entire public directory is made static
app.use(express.static(__dirname+'/Public/files/'))
app.get('/',(req,res)=>{
res.sendFile('Main.html',host_path)
})
app.use(bodyParser.urlencoded({
extended: true
}));
const db=client.db(db_name)

app.post('/reg',function(req,res){
var name=req.body.name
var phone=req.body.phone
var email=req.body.email
var password=req.body.password
var confirmpassword=req.body.confirmpassword
var gender=req.body.gender
var dt={
"name":name,
"email": email,
"phone":phone,
"password":password,
"confirmpassword":confirmpassword,
"gender":gender,
}
db.collection('data').insertOne(dt,function(err,collection){
if(err) console.log(err)
else {
    res.sendFile(`${__dirname}/Public/files/log.html`);
    console.log("Record inserted")}
})
})

app.post('/log', async function (req,res){
    var email=req.body.email
    var password=req.body.password


    var query = {email: email, password: password}
    var output = await db.collection('data').findOne(query)
        console.log(output)
        if(output){
                    res.sendFile(`${__dirname}/Public/files/Main2.html`);
                    console.log('found');
                }else{
                    console.log('not found');
                }

    // MongoClient.connect(url, async function(req,res){
    //     var dbo = client.db("travelRegister");
    //     var query = {email: email, password: password}
    //     var output = await dbo.collection('data').findOne(query)
    //     console.log(output)
    //     if(output){
    //         res.sendFile("Main2.html");
    //         console.log('found');
    //     }else{
    //         console.log('not found');
    //     }
    //     // dbo.close();
    //     // res.end();
    // });
})
    // console.log(`email is ${email} and password is ${password}`);
//     var usermail = db.collection('data').findOne({email:email});
//     if(usermail.password=== password){
//         res.status(201).render("Main2.html");
//     }
//     else{
//         res.status("invalid password");
//     }
// })
app.listen(port,()=>{
console.log(`Example app listening on port ${port}!`)
})

