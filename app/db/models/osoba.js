const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const {validateEmail} = require('../validators');
const randomstring = require('randomstring');

const osobaSchema = new Schema({
    email:{
        type:String,
        require:[true,'Email jest wymagany'],
        lowercase:true,
        trim:true,
        unique: [true, 'Ten email jest juz zajety'],
        validate:[validateEmail, 'Email nieprawidłowy']
    },
    password:{
        type:String,
        require:true,
        minLength:[4, 'Haslo min 4 znaki']
    },
    firstName: String,
    lastName: String,
    apiToken: String
});


osobaSchema.pre('save', function(next){
    const osoba = this;
    
    if (!osoba.isModified('password')){
        return next();
    }else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(osoba.password, salt);
        osoba.password = hash;
        next();
}})

//metoda post to middleware, oddzielna 'validacja', bo uniq to nie walidacja i sie powtarza
osobaSchema.post('save',function(error,doc,next) {
    if (error.code === 11000) {   //11000 to blad z bazyy danych
        error.errors = {email: {message: 'Taki email juz zajety'}};
    }
    next(error);
});

//do apiTOKEN  --zobacz odc tworca stron API-autoryzacja

        //funcja wykona sie tylko podnaczas rejestracji nowego uzytko przed zapisanem(isNew)
osobaSchema.pre('save', function(next) {
    const osoba=this;    //pod this jest aktualny user
    if(osoba.isNew) {   //isNew-- pole wbudowane w mongoose
        osoba.apiToken = randomstring.generate(30);
        next();
}}
)

//'wlasna' metoda modelu user
osobaSchema.methods = {
    comparePassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}

osobaSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName[0]}.`; 
})

const Osoba = mongoose.model('Osoba', osobaSchema);
module.exports = Osoba;