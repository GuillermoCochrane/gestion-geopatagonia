// Dependencias y modulos
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Necesario para usar métodos PUT y DELETE

// Routers
const mainRoutes = require("./routes/mainRouter");
const dashboardRoutes = require("./routes/dashboardRouter");

// Configuración
const app = express();
const port = process.env.PORT || 3003;
app.use(express.static('public'));// Setea carpeta de recuros estáticos
app.use(express.json()); // Necesario para procesar información POST
app.use(express.urlencoded({ extended: false })); // Necesario para procesar información POST
app.use(methodOverride('_method')); // Para sobreescribir el método="POST" en formularios, con PUT y DELETE

// Seteo de motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Seteo de rutas
app.use('/', mainRoutes);
app.use('/dashboard', dashboardRoutes);

//Error 404
app.use((req,res,next) =>{
    res.status(404).send("Error 404 - Página no encontrada")
})

//Levanatando el servidor
app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
