require('dotenv').config();


module.exports = {
    port:process.env.PORT,        //potrzeban do tego bilbioteka dotenv
    database:process.env.DATABASE,
    sessionKeySecret: process.env.SESSION_KEY_SECRET
}