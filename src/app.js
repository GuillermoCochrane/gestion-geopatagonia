// Carga de variables de entorno, si no nos encontramos en producción
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

// Dependencias y modulos
const express = require("express");
const path = require("path");
const methodOverride =  require('method-override'); // Necesario para usar métodos PUT y DELETE
const utilities = require("./utilities/utilities");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const persistUserMDW = require("./middlewares/persistUserMDW");

// Middlewares de acceso
const loggedMDW = require("./middlewares/access/loggedMDW");
const adminAccessMDW = require("./middlewares/access/usuario/adminAccessMDW");
const originadorAccessMDW = require("./middlewares/access/usuario/originadorAccessMDW");
const tratadorAccessMDW = require("./middlewares/access/usuario/tratadorAccessMDW");
const ejecutorAccessMDW = require("./middlewares/access/usuario/ejecutorAccessMDW");
const observadorAccessMDW = require("./middlewares/access/usuario/observadorAccessMDW");

// Routers
const mainRoutes = require("./routes/mainRouter");
const utilitiesAPIRoutes = require("./routes/API/utilitiesAPIRoute");
const dashboardRoutes = require("./routes/dashboardRouter");
const originacionRoutes = require("./routes/originacionesRouter");
const tratamientosRoutes = require("./routes/tratamientosRouter");
const observacionesRoutes = require("./routes/observacionesRouter");
const ejecucionesRoutes = require("./routes/ejecucionesRouter");
const usuariosRoutes = require("./routes/usuariosRouter");

// Configuración
const app = express();
const port = process.env.PORT || 3003;
app.use(express.static('public'));// Setea carpeta de recursos estáticos
app.use(express.json()); // Necesario para procesar información POST
app.use(express.urlencoded({ extended: false })); // Necesario para procesar información POST
app.use(methodOverride('_method')); // Para sobreescribir el método="POST" en formularios, con PUT y DELETE
app.use(session({secret: "You know nothing", resave: false, saveUninitialized: false})); // Necesario para crear sesiones
app.use(cookieParser()); // Necesario para crear cookies
app.use(persistUserMDW); // Middleware global que persiste la sesion del usuario, si hay cookie y no sesión

// Seteo de motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Seteo de rutas
app.use('/', mainRoutes);
app.use('/api/utilities', utilitiesAPIRoutes);
app.use('/dashboard', loggedMDW, adminAccessMDW, dashboardRoutes);
app.use('/originacion', loggedMDW, originadorAccessMDW, originacionRoutes);
app.use('/tratamiento', loggedMDW, tratadorAccessMDW, tratamientosRoutes);
app.use('/observacion', loggedMDW, observadorAccessMDW, observacionesRoutes);
app.use('/ejecucion', loggedMDW, ejecutorAccessMDW, ejecucionesRoutes);
app.use('/usuario', usuariosRoutes);

//Error 404
app.use((req,res,next) =>{
    res.status(404).render("error", utilities.errorData)
})

//Levanatando el servidor
app.listen(port, ()=>{console.log("\n------------------------------------\nLevantando servidor en puerto " + port +  ": \nhttp://localhost:" + port + "\n------------------------------------\n")
});