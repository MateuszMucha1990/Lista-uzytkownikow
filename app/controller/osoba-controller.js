const Osoba = require('../db/models/osoba');
const Users = require('../db/models/users');

class OsobaController {

    showRegister(req,res) {
        res.render('pages/auth/register');
    }

        async register(req,res){
            const osoba= new Osoba({
                email: req.body.email,
                password: req.body.password
            })
            try{
                await osoba.save();
                res.redirect('/zaloguj');
            }catch(e){
                res.render('pages/auth/register',{
                    errors:e.errors,
                    form: req.body
                })
            }
        }

    showLogin(req,res) {
        res.render('pages/auth/login');
    }
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
        req.session.osoba = osoba;
        //{                       //w sesji bede trzymal email/id z bazy uzytkownika
          //  _id: osoba._id,
         //   email: osoba.email,
        //};
        res.redirect('/')  ;//przekierowanie na str glowna
        } catch(e) { //jesli blad to wyrzuci to
        res.render('pages/auth/login', {    //return- bo jesli faktycznie uzytk nie ma, to przerwie tu program
            form: req.body,
            errors: true
        });
        }
       }

       //wylogowanie
       logout(req,res) {
        req.session.destroy();
        res.redirect('/')
       }

       //edycja hasla/maila
       showProfile(req, res) {
        res.render('pages/auth/editprofil', {
            form: req.session.osoba
        });
       }

       async update(req, res){
        const osoba= await Osoba.findById(req.session.osoba._id);
        osoba.email = req.body.email  //zaktualizowac email
        osoba.firstName = req.body.firstName;
        osoba.lastName = req.body.lastName;


        if(req.body.password){  //zakt haslo tylko jesli cos wpiszemya nie puste
            osoba.password = req.body.password;
        }

        try {
            await osoba.save(); //zakt uzytkownik
            req.session.osoba = osoba;
            res.redirect('/admin/editprofil') //jesli brak bledu to zeby wrocilo na ta strone
        } catch (e) {
            res.render('pages/auth/editprofil', {
                errors: e.errors,
                form: req.body
            })
        }
       }
}

module.exports = new OsobaController();