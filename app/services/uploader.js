const path= require ('path')         //path to biblioteka wgrana w Node; pozwala pobierac sciezki/rozszerzenia plikow
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {    //cb=callback
        cb(null, 'public/uploads/');        //null-czy chce przeslac jakis error-nie; ''string z lokalizacja
    },
    filename: function(req,file,cb) {
        const name = Date.now() + path.extname(file.originalname);
        cb(null, name);
    }
});
const upload = multer({storage});

module.exports =upload;