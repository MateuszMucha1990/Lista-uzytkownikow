const Users = require('../../db/models/users');
const fs = require('fs');

//skopiowane z osoba-controller bo sie powtarza

class UsersController {

    async showAllUsers(req, res) {
        const users = await Users.find()
        res.status(200).json(users) //w POSTMANIE
    }

    async create(req,res){
        const users = new Users ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            uzytkownik: req.osoba._id
            //uzytkownik: req.session.osoba._id
            
    });
    try{
        await users.save();
        res.status(201).json(users);  //201-ze dok zostal utworzony i jsonem zwroci dane firmy
    }catch(e){
        res.status(422).json({errors: e.errors})
        }
    }

    async edit(req,res) {
        const { name } = req.params;   //pobieram name
        const users = await Users.findOne({name});
        
        if (req.body.name) users.name= req.body.name;
        if (req.body.email) users.email= req.body.email;
        if (req.body.password) users.password= req.body.password;
        //console.log(req.file);

            //Zobacz film z tworcystron odnosci api=wysylanie plikow

        //nadpisywanie nowego zdjecia za stare
        if (req.file.filename && users.image) {
            fs.unlinkSync('public/uploads/' +  users.image) //usuwanie starego
        }
        if (req.file.filename){
        users.image = req.file.filename;
        }
 
        try{
            await users.save();
            res.status(200).json(users);
        }catch(e){
            res.status(422).json({errors: e.errors})
        }
    }

    async delete(req,res){
        const { name } = req.params;
        try {
            const users = await Users.findOne({name});
            if (users.image) {
                fs.unlinkSync('public/uploads/' +  users.image) 
            }
            await Users.deleteOne({name});
            res.sendStatus(204);
        } catch (e) {
            //
        }
    }
    }



module.exports = new UsersController