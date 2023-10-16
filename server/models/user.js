const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        requred:true,
    },
    password:{
        type:String,
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User;  