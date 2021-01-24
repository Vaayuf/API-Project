const express = require( 'express');
const path = require('path');
const hbs = require('hbs');


require('./db/conn');
const Contact = require('./models/contact');
const e = require('express');

const app = express();
const port = process.env.PORT || 3000;



const views_path = path.join(__dirname,"../templates/views");
app.set("view engine", "hbs");
app.set("views",views_path);


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.render('index');
})


// to post into database
app.post('/', async(req,res)=>{
    try{
        const ContactInfo = new Contact({
            name : req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        })

        console.log(ContactInfo);

        const registered = await ContactInfo.save();
        res.status(201).render("index");
    }catch(e){
        res.status(400).send(e);
    }
})

//to fetch API data from database 
app.get('/contactsapi', async(req,res)=>{
    try{
        const contactsData = await Contact.find();
        console.log(contactsData);
        res.send(contactsData);
    }catch(e){
        res.send(e);

    }
})


 //to search from email or name
 app.get('/:name', async(req,res)=>{
    try{
        const name = req.params.name;
        const contactData = await Contact.find({name:name});
        console.log(contactData);

        if(!contactData){
            return res.status(404).send();
        }else{
        res.send(contactData);
        }
    }catch(e){
        res.status(500).send(e);

    }
})

//to search from email or name
app.get('/:email', async(req,res)=>{
    try{
        const email = req.params.email;
        const contactData = await Contact.find({email:email});
        console.log(contactData);

        if(!contactData){
            return res.status(404).send();
        }else{
        res.send(contactData);
        }
    }catch(e){
        res.status(500).send(e);

    }
})

//to update database

app.patch('/:id', async(req,res) =>{
    try{
        const updateContact = await Contact.findByIdAndUpdate(req.params.id,req.body);
        if(!updateContact){
            res.status(400).send();
        }
        else{
            res.send(updateContact);
        }
    }catch(e){
        res.send(e);
    }
})

//to delete 

app.delete('/', async(req,res) =>{
    try{
        const deleteContact = await Contact.findByIdAndDelete(req.query.id);
        console.log(deleteContact);
        if(!deleteContact){
            res.status(400).send();
        }
        else{
            res.send(deleteContact);
        }
    }catch(e){
        res.send(e);
    }
})


app.listen(port, ()=>{
    console.log("Express connected");
})