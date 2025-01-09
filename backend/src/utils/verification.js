import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const generateTokenAndSetCookies = (res, id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    res.cookie('CLIENTHIVE_JWT', token, {
        httpOnly: true,
        sameSite: 'Lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return token;
}
export const verifyToken = (req, res, next)=>{
    const access_token = req.cookies.CLIENTHIVE_JWT;
    if(!access_token)
        return next(errorHandler(401, 'UNAUTHORISED ACCESS: no token found'))
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
}