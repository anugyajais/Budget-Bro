import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique:true
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
    verifyUserOtp: {
        type: String,
        default: ''
    },
    userVerifyOtpExpiredAt: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiredAt: {
        type: Number,
        default: 0
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
        required: true,
        unique:true
    },
    userSignupDate: {
        type: Date,
        default: Date.now(),
    }
});

export const userTable= mongoose.models.user ||mongoose.model('userTable',userSchema)
/*
user-
    name,no.
    email, pswrd
    uid PK    

*/