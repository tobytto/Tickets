import express from 'express'
import morgan from 'morgan'
import { createRoles } from './src/libs/initialSetup'
import productRoutes from './src/routes/products.routes'
import authRoutes from './src/routes/auth.routes'
import userRoutes from './src/routes/user.routes'
const hbs = require('express-handlebars')

const cors = require('cors');
var corsOptions = {
    origin: "http:127.0.0.1:4600", // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express()
createRoles();


app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

//body parser 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/products',productRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/signup', (req,res)=>{
    res.render('signup')
})
app.get('/home', (req,res)=>{
    res.render('home')
})
app.get('/profile', (req,res)=>{
    res.render('profile')
})
app.get('/payment', (req,res)=>{
    res.render('payment')
})


app.use(express.static('public'));

import * as authCtrl from './src/controllers/auth.controller'
app.post('/api/auth/signin',authCtrl.signIn);



export default app;