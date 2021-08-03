import jwt from 'jsonwebtoken'
import config from '../config';

import User from '../models/user';
import Rol from '../models/rol';


export const verifyToken = async (req,res,next) =>{
        try {

        //const token = req.headers["x-access-token"];
        //const token = req.headers.authorization
        if(!req.headers.authorization) return res.status(403).json({message: "no token provided"})

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token,config.SECRET) //token decodificado
        req.userId = decoded.id;

        const user = await User.findById(req.userId, {password:0})
        console.log(user)
        if(!user) return res.status(404).json({message: 'no user found'})

        next();

        }catch (error) {
            return res.status(401).json({message: "unauthorized"})   
        }
}

export const isModerator = async (req,res,next) => {
    const user = await User.findById(req.userId)
    const roles = await Rol.find({_id:{$in:user.roles}})

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "moderator"){
            next()   
            return;
        }
     
    }
    return res.status(403).json({message: "Require Moderator role"})
}

export const isAdmin = async(req,res,next) =>{
    const user = await User.findById(req.userId)
    const roles = await Rol.find({_id:{$in:user.roles}})

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next()   
            return;
        }
     
    }
    return res.status(403).json({message: "Require Admin role"})
}