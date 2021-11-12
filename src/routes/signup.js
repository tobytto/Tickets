const express = require('express');
const router = express.Router();

const bcrypt  = require('bcrypt');
const User    = require('../models/user');
const { JsonWebTokenError } = require('jsonwebtoken');




/* GET signup page. */
router.get('/', function(req, res) {
    res.render('signup', { title: 'Express' });
  });
  
router.post('/', async(req, res) =>{
    const {username, password, mail, number, documento, dateb, pais, localidad} = req.body;

    const newUser = new User({username, documento, localidad, dateb, pais, password, mail, number});
   

    try{
        const savedUser = await newUser.save();
          console.log(newUser);
          return res.json({ message: "Correctamente registrado"});
    }catch(err){
          return res.status(400).json({ error: 'Error al registrarse'});       
      }  

});


  module.exports = router;