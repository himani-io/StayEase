const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
console.log(typeof passportLocalMongoose);

const userSchema = new Schema({
    email : {
       type: String,
       required: true,
       unique: true,
    }
});

const plm = (typeof passportLocalMongoose === 'function') 
    ? passportLocalMongoose 
    : passportLocalMongoose.default;

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);