const express = require('express');
const router =  new express.Router();    //nowa instancja expressa
const UsersController = require('../controller/users-controller');
const PageController =require('../controller/page-controller');
const OsobaController =require('../controller/osoba-controller');
const upload = require('../services/uploader')



//strona glowna
router.get('/',PageController.home) ;
  
//kontakty
router.get('/kontakt', PageController.kontakty) ;


//wszystkie profilie
router.get('/profile', UsersController.showAllUsers);


//profile uzytkownikow
router.get('/profile/:name', UsersController.showUsers);


//dodaje profile
router.get('/admin/profile/dodaj', UsersController.showCreateUserForm);
router.post('/admin/profile/dodaj',upload.single('image'), UsersController.createUser);

//edytuj
router.get('/admin/profile/:name/edytuj', UsersController.showEditUserForm);
router.post('/admin/profile/:name/edytuj', upload.single('image'),UsersController.editUser);
 //middleware mozna wstawic w srodku(czyli upload.single-ale mozna wiecej naraz)
//'image' bo taka nazwa name/classy w form.ejs


//usun
router.get('/admin/profile/:name/usun', UsersController.deleteUser);
router.get('/admin/profile/:name/usun-zdjecie', UsersController.deleteImage)

//plik CSV
router.get('/csv', UsersController.getCSV)



//rejestracja
router.get('/zarejestruj', OsobaController.showRegister);
router.post('/zarejestruj', OsobaController.register);

//logowanie
router.get('/zaloguj', OsobaController.showLogin);
router.post('/zaloguj', OsobaController.login);

//Wylogowanie
router.get('/wyloguj', OsobaController.logout);

//edycja maila/hasla
router.get('/admin/editprofil', OsobaController.showProfile);
router.post('/admin/editprofil', OsobaController.update);

//nie znaleziono strony
router.get('*',PageController.notFound );



module.exports = router;