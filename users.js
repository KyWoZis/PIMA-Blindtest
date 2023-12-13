import dotenv from 'dotenv';

dotenv.config();

var JWT_SECRET = process.env.JWT_SECRET;
import {checkUser, checkAdmin, checkMatchUserAndId} from './database.js';
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
    if (req.cookies.jwt_token) { // If the user is logged
        var user_not_checked = jsonwebtoken.verify(req.cookies.jwt_token, JWT_SECRET); // We get the user, not sure if it still exists
        if (checkMatchUserAndId(user.username, user.user_id)) { // If the user still exists
            var user = user_not_checked;
        }
    }
    return user; // If the user is not logged, it will return undefined 
}

export async function checkLoggedAndAdmin(req) {
    var user = await getCurrentUser(req);
    if (user) {
        var is_ad = await checkAdmin(user.username);
    }
    return is_ad;
}