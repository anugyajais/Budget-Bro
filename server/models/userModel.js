import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim:true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    userPassword: {
        type: String,
        required: true,
        trim:true
    },
    userFirstName: {
        type: String,
        required: true,
        trim:true
    },
    userMiddleName: {
        type: String,
        trim:true
    },
    userLastName: {
        type: String,
        required: true,
        trim:true
    },
    userContactNumber: {
        type: String,
        required: true
    },
    userSignupDate: {
        type: Date,
        default: Date.now(),
    }
});

export const userTable= mongoose.model('userTable',userSchema)


/*
user-
    name,no.
    email, pswrd
    uid PK    

*/