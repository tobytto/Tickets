import express from 'express'
import morgan from 'morgan'
import { createRoles } from './src/libs/initialSetup'
import productRoutes from './src/routes/products.routes'
import authRoutes from './src/routes/auth.routes'
import userRoutes from './src/routes/user.routes'
const hbs = require('express-handlebars');
const cors = require('cors');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/img'),
    filename: (req,file,cb) =>{
        cb(null,file.originalname);
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });


var corsOptions = {
    origin: "http://localhost:5555/", // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express()
createRoles();
const imgRoutes = require('./src/routes/img.routes');
//setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(multer({
    storage,
    upload,
    dest: path.join(__dirname, '/public/img/')

}).single('imgUrl'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const signupRoutes = require('./src/routes/signup');
const loginRoutes = require('./src/routes/login');

//middlwares


app.use('/home',productRoutes);
app.use('/img', imgRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);




//renders
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/signup', (req,res)=>{
    res.render('signup')
})
// app.get('/products', (req,res)=>{
//     res.render('products')
// })
app.get('/profile', (req,res)=>{
    res.render('profile')
})
app.get('/payment', (req,res)=>{
    res.render('payment')
})

app.use(express.static(path.join(__dirname, '/public')));



import * as authCtrl from './src/controllers/auth.controller'
app.post('/api/auth/signin',authCtrl.signIn);



export default app;