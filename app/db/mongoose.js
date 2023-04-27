const mongoose = require('mongoose');
const {database} = require('../config');

mongoose.connect(database);
mongoose.set('strictQuery', false);


// const Users = require('./models/users')
// //zapisywanie nowego uzytkownika
// async function saveUser (){
  
//     const nowe = new Users({
//       name:'mateusz2',
//       email:'aleco@com.pl',
//       password:'cosniecos',
//     });
    
//     try {
//       await nowe.save();
//     } catch (e) {
//       console.log('Coś poszło nie tak...');
//       for (const key in e.errors) {
//         console.log(e.errors[key].message);
//       }
//     }
//   }
//   //saveUser();
  
//   //pobieranie z bazy
//   async function getUsers(){
//     const users = await User.find({});
//     console.log(users);
//   }
//   //getUsers();
  
//   console.log('działa');
