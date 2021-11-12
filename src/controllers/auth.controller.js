import User from '../models/user'
import jwt from 'jsonwebtoken'
import config from '../config'
import Rol from '../models/rol';

export const signUp = async(req,res) => {
    const {username,email,password, roles} = req.body;

    //const userFound = User.find({email})

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if(roles){
        const foundRoles = await Rol.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(rol => rol._id)
    }else{
        const rol = await Rol.findOne({name:"user"})
        newUser.roles = [rol._id];
    }

    const savedUser = await newUser.save();
    console.log(savedUser);

    const token = jwt.sign({
        id: savedUser._id},
        config.SECRET,{
        expiresIn:86400 //24 horas
    })
  
    res.status(200).json({
        message: 'Usuario creado correctamente',
        token: {token} 
    })
    
   
}


export const signIn = async (req,res) => {

    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    if(!userFound) return res.status(400).json({message: "User not found"})
   
 
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
 
    if(!matchPassword) return res.status(400).json({token: null, message: "Invalid password"})
 
    const token = jwt.sign({id: userFound._id}, config.SECRET, { 
        expiresIn: 86400
    })
 
    res.json({token})      
    

}