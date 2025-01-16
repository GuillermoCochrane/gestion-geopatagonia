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
    const newName = coleccion.charAt(0).toUpperCase() + coleccion.slice(1);
    return {
      tabla: `tabla${newName}`,
      path: coleccion,
      formulario: `form${newName}`,
    }
  },

  headerData: function (entidad) {
    return {
      mainLabel: entidad.charAt(0).toUpperCase() + entidad.slice(1),
      newLabel: `Nuevo ${entidad}`,
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
      const dashboardHeader =  this.headerData(entidad);
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

  estadosData: async function() {
    return this.dataHandler(Estado, "estado", "estados");
  },

  rolesData: async function() {
    return this.dataHandler(Rol, "rol", "roles");
  },
}

module.exports = dashboardUtilities;