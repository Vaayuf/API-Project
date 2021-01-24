const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        unique: [true, 'Number already present']
    },
    email:{
        type: String, 
        required: true,
        unique: [true, 'Email already present'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }

    }
})

const ContactReg = mongoose.model('Contact', contactSchema);
module.exports = ContactReg;