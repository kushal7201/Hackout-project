import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';

router.use(express.json());
dotenv.config();
const signup_get =
    async (req, res) => {
        try {
            res.render('login');
        } catch (error) {
            console.log(error);
        }
    }
const signup_post =
    async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !password)
                res.status(400).send('All fields are required');

            //verify if user already exists, using name
            const checkExistingUser = await User.findOne({ email: email });

            if (checkExistingUser) {
                res.status(400).send('User Already Exists');
            }
            else {
                //encrypt password 
                const hashedPassword = await bcrypt.hash(password, 10);
                var newUser = await User.create({
                    name,
                    email,
                    password: hashedPassword
                })
                //generate token
                var token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
                newUser.token = token;
                newUser.password = undefined;
                res.status(200).json(newUser);
            }
        }


        catch (err) {
            console.log(err);
        }
    }


const login_post =
    async (req, res) => {
        try {
            //getting data from body
            const { email, password } = req.body;
            if (!email || !password)
                res.status(400).send('All fields required');
            //check if user exists in database
            const loggedInUser = await User.findOne({ email })


            //verify the entered password from the user.password
            if (loggedInUser && (await bcrypt.compare(password, loggedInUser.password))) {
                //if verified, create and send a token
                const token = jwt.sign({ id: loggedInUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });
                loggedInUser.token = token;
                loggedInUser.password = undefined;

                //send token to user cookie
                const options = {
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                    //Only server can manipulate this cookie
                    httpOnly: true
                }
                res.status(200).cookie("token", token, options).json({
                    success: true,
                    loggedInUser
                })
            }

            else if (!loggedInUser)
                res.status(401).send('Please Sign Up first');

            else
                res.status(402).send('Wrong Password');
        }

        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }


export default { signup_get, signup_post, login_post };