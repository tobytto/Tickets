import {Schema,model} from 'mongoose'
// import bcrypt from 'bcryptjs'


// const userSchema = new Schema({
//     username:{
//       type: String,
//       unique: true,
//     },
//     email:{
//         type: String,
//         unique: true
//     },
//     password:{
//        type: String,
//        required:true
//     },
//     documento:{
//         type: String,
//         required:true,
//         unique: true
//      },
//      phonenumber:{
//         type: Number,
//         required:true
//      },
//      borndate:{
//         type: Date,
//         required:true
//      },
//      password:{
//         type: String,
//         required:true
//      },
//      roles:[{
//         ref: "Rol",
//         type: Schema.Types.ObjectId
//     }]
// }, {
//     timestamps: true,
//     versionKey: false
// });


// userSchema.statics.encryptPassword = async (password) => {
//    const salt = await bcrypt.genSalt(10)
//    return await bcrypt.hash(password, salt)
// }

// userSchema.statics.comparePassword = async (password,recievedPassword) => {
//     return await bcrypt.compare(password,recievedPassword)
// }

// export default model('User', userSchema);

const bcrypt        = require('bcrypt');
const mongoose      = require('mongoose');

//cantidad de veces que se encripta
const saltRounds = 10;

//esquema de usuario y contraseña
const UserSchema = new mongoose.Schema({
    username:   { type: String, required: true, unique: true },
    mail:       { type: String, required: true, unique: true },
    number:     { type: Number, required: false },
    documento:  { type: String, required: true, unique: true },
    password:   { type: String, required: true  },
    localidad:  { type: String, required: false },
    pais:       { type: String, required: true  },
    dateb:      { type: Date, required: true  },
    roles:[{
            ref: "User",
            type: Schema.Types.ObjectId
           }]
},
{
        timestamps: true,
        versionKey: false
 },
{ versionKey: 'false' }
);

UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){

        const document = this;

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) =>{
            if(err){
                next(err);
            } else{
                document.password = hashedPassword;
                next();
            }
        })
    } else{
        next();
    }
})



UserSchema.methods.isCorrectPassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, same){
        if(err){
            callback(err);
        } else{
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);