//Middleware de configuración de multer para adjuntos de observaciones o PACs
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "../../../public/documents/observacion_PAC"))
    },
    filename: function(req,file, cb){
        let newFileName = "Adjunto_ObsPAC" + Date.now() + path.extname(file.originalname)
        cb(null, newFileName)
    }
})

const uploading = multer({storage})

module.exports = uploading