import { userTable } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JsonWebTokenError } from "'jsonwebtoken";
import {jwbSecretToken } from "../config.js";
export const register = async (req, res) => {
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
        const newUser = new userTable({userName, userEmail, userPassword: hashedPassword});
        await newUser.save();
        const payload = { id: payload._id }
        const staySignedIn = req.body.staySignedIn; // from the checkbox on the form if yes then 90 days otherwise 3 hr
        const jwtOptions = { expiresIn: staySignedIn ? '90d' : '3h' };
        const cookieMaxAge = staySignedIn ? 90*24*60*60 : 10800;
        // console.log(req.body);
        const userTokenJWT = jwt.sign(payload, jwbSecretToken, jwtOptions);
        res.cookie('userToken', userTokenJWT, {maxAge: cookieMaxAge , httpOnly:true});

    } catch (error) {
        console.error(error);
        res.status(500).send({ success:false,  message: error.message });
    }
}