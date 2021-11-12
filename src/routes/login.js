const express = require('express');
const router = express.Router();



const User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Login: inicia sesion' });
    console.log('hola');
  });
  
router.post('/', function(req, res){
    const {mail, password} = req.body;
    

    User.findOne({mail}, (err, mail) =>{
        if(err){
            res.status(500).send('Error al autenticar');
        }else if(!mail){
            res.status(500).send('El usuario no esta registrado');
        }else{
            mail.isCorrectPassword(password, (err, result) =>{
                if(err){
                    res.status(500).send('Error al autenticar');
                }else if(result){
                       res.status(200).send('Bienvenido');
                }else{
                    res.status(500).send('Contraseña incorrecta');
                }
            });
        }
    })

});

module.exports = router;