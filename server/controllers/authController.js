import { userTable } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {jwbSecretToken, nodeEnv } from "../config.js";
import { strict } from "assert";
import pkg from 'jsonwebtoken';
const { JsonWebTokenError } = pkg;
export const userRegister = async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;
    try {
        if (!userName || !userEmail || !userPassword) {
            return res.status(400).send({ success:false, message: `fill out the details please` });
        }
        const userExists = await userTable.findOne({userName})
        if (userExists) {
            res.send({success:false, message:`EMAIL ALREADY EXISTS`})
        }
        const hashedPassword = await bcrypt.hash(userPassword, 10); // 5 se 15 k beech m kch bhi chclega  10 is usually enuff and 5 is less secrtooy
        const newUser = new userTable({
            userName,
            userEmail, 
            userPassword: hashedPassword,    
        });
        if (newUser.userContactNumber === 0 || newUser.userContactNumber === null) {
            newUser.userContactNumber = null;
        }
        console.log(newUser);
        await newUser.save();
        const payload = { id: newUser._id };
        const staySignedIn = req.body.staySignedIn; // from the checkbox on the form if yes then 90 days otherwise 3 hr
        const jwtOptions = { expiresIn: staySignedIn ? '90d' : '3h' };
        const cookieMaxAge = 1000 * (staySignedIn ? 90 * 24 * 60 * 60 : 3 * 60 * 60); // same as token expiry time 90days or 3 hr
        // console.log(req.body);
        const userTokenJWT = jwt.sign({payload}, jwbSecretToken, jwtOptions);
        res.cookie('userToken', userTokenJWT, {
            httpOnly: true,
            // secure: nodeEnv === 'production',
            // sameSite: nodeEnv === 'production' ? 'None' : 'Strict' ,
            maxAge: cookieMaxAge,
        });
        return res.status(200).send({success:true, message:`signup successful`})
        ī
    } catch (error) {
        console.error(error);
        res.status(500).send({ success:false,  message: error.message });
    }
}
export const userLogin = async (req, res) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
        return res.status(400).send({
            success: false,
            message: `Email or password not filled`
        });
    }
    try {
        const isValid = true;
        const user = await userTable.findOne({ userEmail });
        if (!user) {
            isValid = false;
        }
        const passwordMatches = await bcrypt.compare(userPassword, user.userPassword);
        if (!passwordMatches) {
            isValid = false
        }
        if (!isValid) {
            return res.status(404).send({ success: false, message: `Email or Password incorrect. Please check your email address and/or password or sign up if you don't have an account.` });
        }
        const payload = { id: newUser._id } //the payload in the jwt body. 
        // const payload = { userId: req.body.user  Id }; 
        const staySignedIn = req.body.staySignedIn; // from the checkbox on the form if yes then 90 days otherwise 3 hr
        const jwtOptions = { expiresIn: staySignedIn ? '90d' : '3h' };
        const cookieMaxAge = 1000 * (staySignedIn ? 90 * 24 * 60 * 60 : 3 * 60 * 60); // same as token expiry time 90days or 3 hr
        const userTokenJWT = jwt.sign(payload, jwbSecretToken, jwtOptions);
        res.cookie('userToken', userTokenJWT, {
            httpOnly: true,
            secure: nodeEnv === 'production',
            sameSite: nodeEnv === 'producction' ? none : strict,
            maxAge: cookieMaxAge,
        });
        return res.status(200).send({ success: true, message: `logged in successfully` })
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message
        });
    }
};

export const    logout = async (req, res) => {
    try {
        res.clearCookie('userToken', {
            httpOnly: true,
            secure: nodeEnv === 'production',
            sameSite: nodeEnv === 'production' ? none : strict,
        });
        return res.status(200).send({ success: true, message: `logged out successfully` });
        
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: err.message
        });
    }
};