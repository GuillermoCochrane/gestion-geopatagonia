const db = require("../database/models");
const utilities = require("./utilities");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;

const dashboardUtilities = {

  styles: ["dashboard"],

  pageScript: ["dashboard/dashboard"],

  errorInfo: function(errormsg){
    return {
      subSection: "./error.ejs",
      title: "Error",
      styles: this.styles,
      pageScript: this.pageScript,
      error: true,
      message: `No hay ${errormsg} disponibles en la base de datos.`,
      errorData: null,
    }
  },

  errorHandler: function(error){
    let errorData = this.errorInfo();
    errorData.message = "Error interno del servidor.";
    errorData.errorData = error.message || error;
    return errorData;
  },

  configData: function(coleccion){
    const newName = utilities.adjustUnderscores(coleccion,false) //coleccion.charAt(0).toUpperCase() + coleccion.slice(1);
    return {
      tabla: `tabla${newName}`,
      path: coleccion,
      formulario: `form${newName}`,
    }
  },

  headerData: function (entidad, coleccion) {
    return {
      mainLabel: utilities.adjustUnderscores(coleccion,true),
      newLabel: `Nuevo ${utilities.adjustUnderscores(entidad,true)}`,
    };
  },

  dataHandler: async function (modelo, entidad, coleccion) {
    try {
      // Consulta a la base de datos
      let registros = await modelo.findAll();

      // Si no se encuentran registros, devolvemos un mensaje de error
      if (registros.length === 0) {
        return this.errorInfo(coleccion);
      }

      // Convertimos las instancias de Sequelize a objetos planos
      let registrosPlanos = registros.map((registro) => registro.get({ plain: true }));

      // Formateamos las fechas en los registros
      registrosPlanos = utilities.multipleDateFormat(registrosPlanos);

      // Generamos encabezado y configuración dinámicos
      const dashboardHeader =  this.headerData(entidad, coleccion);
      const config = this.configData(coleccion); 
      const pageScript = [...this.pageScript, "dashboard/sectionhandler"];

      // Retornamos los datos procesados
      return {
        ...config,
        pageScript,
        dashboardHeader,
        [coleccion]: registrosPlanos,
        title: dashboardHeader.mainLabel,
        styles: this.styles,
        subSection: "./subSections.ejs",
      };
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  indexData: function(){
    return {
      subSection: "./index.ejs",
      title: "Panel de control",
      styles: this.styles,
      pageScript: this.pageScript
    }
  },

  createRol: async function(data){
    try {
      // Creamos el objeto Rol
      const rol = await Rol.create(data);

      // Si se crea el rol, devolvemos el objeto creado
      if (rol) {
        return rol;
      }
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  rolErrorsHandler: async function(modelo, entidad, coleccion, oldDara, errors){
    let data = await this.dataHandler(modelo, entidad, coleccion);
    console.log(data);
    data.rol = {rol: oldDara.rol};
    data.errors = errors;
    return data;
  },

  createOrigen: async function(data){
    try {
      const origen = await Origen.create(data);
      if (origen) {
        return origen;
      }
    } catch (error) {
      console.error(error); 
      return this.errorHandler(error);
    }
  },

}

module.exports = dashboardUtilities;