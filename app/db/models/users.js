const { model } = require("mongoose");
const mongoose = require('mongoose');
const Schema =mongoose.Schema;


//const {validateEmail} = require('../validators')


//nowy Schemat
const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Pole jest wymagane'],
        trim: true, 
        minLength: [3,'Minimum trzy znaki']}, 
        
    email: {
        type: String, 
        required: [true, 'Poled jest wymagane'],
        lowercase:true ,
        trim:true, 
      },
    password: {
        type: String, 
        required: true,
      },
    isAdmin : {
      type:Number,
      default:0,
      min:0,
      max:1
    },

    uzytkownik: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Osoba'
    },

    image:{
      type:String }
  },

);

//hashowanie hasla
// const hash = value =>'niewidac hasla';
// userSchema.path('password').set(value=> hash(value));


//nowy Model
const Users =mongoose.model('Users',userSchema);

module.exports = Users;

