import mongoose from "mongoose";
import validator from 'validator';

const userSchema =  new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        min: 2,
        max: 50,

    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required: true,
        validate: validator.isEmail,
    },
    password: {
        type: String, 
        required: true,
    },
},
{ timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;