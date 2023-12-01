import dotenv from 'dotenv';

dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET;
import {checkUser} from './database.js';
import jsonwebtoken from 'jsonwebtoken';

export async function login(username, password, res) {
    const user = await checkUser(username, password);
    if (user) {
        var jwt_token = jsonwebtoken.sign({username : user.username, user_id : user.user_id}, JWT_SECRET);
        res.cookie('jwt_token', jwt_token);
        res.redirect('/');
    }
    else {
        res.send("Wrong username or password.");
    }
}

export async function logout(res) {
    res.clearCookie('jwt_token');
    res.render('./');
    console.log("Your cookie has been deleted.");
} 

export async function getCurrentUser(req) {
    if (req.cookies.jwt_token) {
        var user = jsonwebtoken.verify(req.cookies.jwt_token, JWT_SECRET);
    }
    return user;
}