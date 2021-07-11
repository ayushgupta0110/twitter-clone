const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    profilePic: {
        type: String,
        default: '/images/profilePic.jpeg'
    }
});

userSchema.plugin(passportLocalMongoose);  //passportLocalMongoose pkg will automatically add usename and password fields

const User = mongoose.model("User", userSchema);

module.exports = User;