const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/contact',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify : false,
}).then(()=>{
    console.log('conn');
}).catch((e)=>{
    console.log(e);
})