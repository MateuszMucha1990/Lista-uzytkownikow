const Users = require('../db/models/users');
const fs = require('fs');   //biblioteka do czytania plików
const {Parser} = require('json2csv')  //bibl do przeslania csv {}-elemenet z bilbio a nie cala-chyba

class UsersController {

    async showAllUsers(req, res) {
        const { q, sort }= req.query;
        const page = req.query.page || 1;
        const perPage = 2;


        const where = {};
        where.name = { $regex: q || '', $options: 'i'};


        //search
       let query = Users.find(where)

       
      
       //pagination
       query = query.skip((page - 1) * perPage);
       query = query.limit(perPage)


      //sortowanie
       if (sort) {
        const s = sort.split('|');
        query = query.sort({ [s[0]]: s[1]})
       }
       

       //excec --pobranie faktycznych wynikow szukania/filtracji/sortowania
       const Lista = await query.populate('uzytkownik').exec() //populate- wypelni pole uzytkownik
       const resultCount = await Users.find(where).count();
       const pagesCount = (Math.ceil(resultCount / perPage));

        res.render('pages/uzytkownicy/profile', {
         Lista,
         title:Lista?.name,
         page,
         pagesCount,
         resultCount       
        })
    }
    
    async showUsers(req, res)  {
        const {name} = req.params;
        const users = await Users.findOne({name});
    
            // wyrenderuj profil użytkownika 
            // jeśli nie ma usera wyświetl taką informacje
            
            res.render('pages/uzytkownicy/user', {
                name: users?.name,
                
                title:users?.name,
                //url:req.url 
            })
        };
        
        //TWORZENIE
        showCreateUserForm(req,res){
            res.render('pages/uzytkownicy/create',);
        }
        
        async createUser(req,res) {
            const users = new Users ({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                uzytkownik: req.session.osoba._id
        });
        try{
            await users.save();
            res.redirect('/profile');
        }catch(e){
            res.render('pages/uzytkownicy/create',{
                errors:e.errors,
                form: req.body
            })
        }
        console.log(users.name);
    }

    //EDYCJA;
   async showEditUserForm(req,res){
        const { name } = req.params;
        const users = await Users.findOne({name})

            console.log(users);
        res.render('pages/uzytkownicy/edit', {
            form: users
        });
    }

    async editUser(req,res) { 
        const { name } = req.params;
        const users = await Users.findOne({name});
        users.name= req.body.name,
        users.email= req.body.email,
        users.password= req.body.password;
        //console.log(req.file);

        //nadpisywanie nowego zdjecia za stare
        if (req.file.filename && users.image) {
            fs.unlinkSync('public/uploads/' +  users.image) //usuwanie starego
        }
        if (req.file.filename){
        users.image = req.file.filename;
        }

        
        try{
            await users.save();
            res.redirect('/profile');
        }catch(e){
            res.render('pages/uzytkownicy/edit',{
                errors:e.errors,
                form: req.body
            })
        }
    }
    
    async deleteUser(req,res) {
        const { name } = req.params;
        const users = await Users.findOne({name});
        try {
            const users = await Users.findOne({name});
            if (users.image) {
                fs.unlinkSync('public/uploads/' +  users.image) 
            }
            await Users.deleteOne({name});
            res.redirect('/profile');
        } catch (e) {
            //
        }
    }


    async deleteImage(req, res){
        const { name } = req.params;
        const users = await Users.findOne({name})
        
        try {
            fs.unlinkSync('public/uploads/' +  users.image)
            users.image='';
            await users.save();

            res.redirect('/profile');
        } catch (e) {
            //
        }
    }

 //CSV
 async getCSV(req,res){
    const fields =[   //pola ktore chce pobrac z bazy danych-users
     {
        label:'Nazwa',
        value:'name'
     },
     {
        label:'URL',
        value:'email',
     },
     {
        label:'Haslo',
        value:'password',
     },
    ] ;

    const data = await Users.find()    //wszystkie pobrane firmy
    const fileName = 'users.csv'   //nazwa pliku ktory chce wygenerowac
     
    const jason2csv = new Parser({fields});
    const csv = jason2csv.parse(data);

    res.header('Content-Type', 'text/csv');  //informuje przegladarke ze to co wysylam do dokum typu csv
    res.attachment(fileName); //zalacznik o nazwie
    res.send(csv);  //wyslanie danych
}

}


module.exports = new UsersController();  //new instancja, zeby wejsc w web.js