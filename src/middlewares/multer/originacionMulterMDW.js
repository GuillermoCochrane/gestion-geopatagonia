//Middleware de configuración de multer para adjuntos de originaciones
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../../../public/documents/originacion"))
    },
    filename: function(req,file, cb){
        let newFileName = "Adjunto_Originacion" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const upload = multer({storage})

module.exports = upload