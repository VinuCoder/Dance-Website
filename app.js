const express=require('express');   //importing express module
const app=express();    // name of app is 'app'
const path=require('path');  // this module is used to enter string 
const bodyparser=require('body-parser');    // This is used to enter the post data in database   NOTE:- this is not use in this website
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

// Defining mongoose schemas
const contactschema = new mongoose.Schema({
    name: String,
    mobile_no: Number,
    email_Id: String,
    gender: String,
    address: String,
});

const contact = mongoose.model('contact', contactschema);

const port=8000;

// To write a static file
app.use("/static",express.static('static'))  // here second static inside the single is name of folder static files are used to show the same line we write in our js
app.use(express.urlencoded());  // This is used to get our data from form to express

// set the template engine as pug
app.set('view engine','pug');

// Set the views dirctory
app.set('views', path.join(__dirname,'views'));

// Our pug demo endpoint
app.get('/',(req,res)=>{
    res.status(200).render('index.pug',{})   // we can search all this code for pug on google
}); 
app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug',{})   // we can search all this code for pug on google
}); 
app.get('/home',(req,res)=>{
    res.status(200).render('home.pug',{})   // we can search all this code for pug on google
}); 
app.post('/contact',(req,res)=>{
    var myData= new contact(req.body)
    myData.save().then(()=>{
        res.send("This item is saved to the database")
    }).catch(()=>{
        res.status(400).send("This item cannot be saved to the database")
    }); 
}); 

app.listen(port,()=>{
    console.log(`The app is serving on the port ${port}`);
});