const express = require('express');
const router =  new express.Router(); 
const UsersController = require('../controller/api/users-controller');
const upload = require('../services/uploader');
const authMiddleware = require('../middlewares/is-auth-api-middleware');
const ApiController = require('../controller/api/api-controller');
            
                //PRZYKLAD
// router.get('/profile',(req,res) =>{
//     // res.header('Content-Type', 'application/json');
//     // res.send(JSON.stringify({text: 'valu'}))
//     //to wyzej to samo to co nizej

//     res.json({text: 'cos'})
// })


router.get('/profile', UsersController.showAllUsers)

//tworzenie
router.post('/profile', authMiddleware, UsersController.create)

//edit (w RESTfull powinno byc PATCH zamist put - chyba)
router.put('/profile/:name',authMiddleware, upload.single('image'), UsersController.edit)

//usuwanie
router.delete('/profile/:name',authMiddleware, UsersController.delete)

//login
router.post('/login', ApiController.login)



module.exports = router;