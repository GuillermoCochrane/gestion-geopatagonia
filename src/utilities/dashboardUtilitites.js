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

  dataHandler: async function (Modelo, entidad, coleccion) {
    try {
      // Consulta a la base de datos
      let registros = await Modelo.findAll();

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

  createEntity: async function (Modelo, data) {
    try {
      // Almacenamos en entity los datos recibidos al intentar crear la entrada en la base de datos
      const entity = await Modelo.create(data);
      // si se crea la entrada, devolvemos el objeto creado
      if (entity) return entity;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  formErrorsHandler: async function(modelo, entidad, coleccion, oldData, errors) {
    try {
        // Obtiene datos para la vista
        let data = await this.dataHandler(modelo, entidad, coleccion); 
        console.log(data);
        data[entidad] = {};
        // Itera sobre todas las claves de oldData
        for (const fieldName in oldData) {
            // Agrega cada campo ingresado por el usuario al objeto de datos
            data[entidad][fieldName] = oldData[fieldName];
        }

        // Agrega los errores de validación
        data.errors = errors;

        return data; // Devuelve el objeto con los datos necesarios para la vista
    } catch (error) {
        console.error(error);
        return this.errorHandler(error); // Maneja errores internos si ocurre un problema
    }
},

}

module.exports = dashboardUtilities;