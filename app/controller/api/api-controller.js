const Osoba = require('../../db/models/osoba');

//skopiowane z osoba-controller bo sie powtarza
class OsobaController {

    //spr email
   async login(req,res){
    try{ 
         const osoba= await Osoba.findOne({email: req.body.email});
    if (!osoba){
        throw new Error ('user not found')  
    }
    
    //spr hasla
    const isValidPassword =osoba.comparePassword(req.body.password);
    if(!isValidPassword) {
        throw new Error ('password not valid')  
    }
    
    //login
    res.status(200).json({ apiToken: osoba.apiToken}); //jesli uzytk poprawy to w ten sposob przekaze TOKEN

    } catch(e) { //jesli blad to wyrzuci to
        res.status(401)
    }
   }
}
module.exports = new OsobaController();