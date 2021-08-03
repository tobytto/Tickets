import express from 'express'
import morgan from 'morgan'
import { createRoles } from './libs/initialSetup'
import productRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
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


app.get('/api/auth/signin',(req,res)=>{
    res.render('signin')
})
app.get('/api/auth/signup', (req,res)=>{
    res.render('signup')
})
app.get('/home', (req,res)=>{
    res.render('home')
})


app.use(express.static('public'));

import * as authCtrl from './controllers/auth.controller'
app.post('/api/auth/signin',authCtrl.signIn);



export default app;