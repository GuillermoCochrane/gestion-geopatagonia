// Dependencias y modulos
const express = require("express");
const path = require("path");

// Routers
const mainRoutes = require("./routes/mainRouter");

// Configuracion
const app = express();
const port = process.env.PORT || 3003;
app.use(express.static('public'));// Set Static Resources folder
app.use(express.json()); // Required for processing POST method information
app.use(express.urlencoded({ extended: false })); // Required for processing POST method information

// Seteo de rutas
app.use('/', mainRoutes);

//Error 404
app.use((req,res,next) =>{
    res.status(404).send("Error 404 - Página no encontrada")
})

//Levanatando el servidor
app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});
