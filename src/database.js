import mongoose from 'mongoose'
require('dotenv').config()

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pvrdt.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:true, useCreateIndex: true}
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))