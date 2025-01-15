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

  indexData: function(){
    return {
      subSection: "./index.ejs",
      title: "Panel de control",
      styles: this.styles,
      pageScript: this.pageScript
    }
  },

  estadosData: async function() {
    try {

      let estados = await Estado.findAll();

      // Si no se encuentran estados, devolvemos un mensaje de error
      if (estados.length === 0) {
        let data = this.errorInfo("estados");
        return data;
      }

      // Convertimos las instancias de Sequelize a objetos planos
      let estadosPlanos = estados.map(estado => estado.get({ plain: true }));
      const dashboardHeader = {
        mainLabel: "Estados",
        newLabel: "Nuevo estado"
      };

      let pageScript = this.pageScript;
      pageScript.push("dashboard/sectionhandler");
      
      // Formateamos la fecha de creación y actualización a cada estado 
      estadosPlanos = utilities.multipleDateFormat(estadosPlanos);

      return {
        subSection: "./estados.ejs",
        title: "Estados",
        dashboardHeader: dashboardHeader,
        styles: this.styles,
        pageScript: this.pageScript,
        estados: estadosPlanos
      };
  
    } catch (error) {
      console.error(error); // Registro del error para depuración
      let data = this.errorInfo();
      data.message = "Error al obtener los estados.";
      data.errorData = error.message || error;
      return data;
    }
  },

  rolesData: async function() {
    let roles = await Rol.findAll();

    // Si no se encuentran roles, devolvemos un mensaje de error
    if (roles.length === 0) {
      let data = this.errorInfo("roles");
      return data;
    }

    // Convertimos las instancias de Sequelize a objetos planos
    let rolesPlanos = roles.map(rol => rol.get({ plain: true }));
    const dashboardHeader = {
      mainLabel: "Roles",
      newLabel: "Nuevo rol"
    };

    let pageScript = this.pageScript;
    pageScript.push("dashboard/sectionhandler");

    return {
      subSection: "./roles.ejs",
      title: "Roles",
      dashboardHeader: dashboardHeader,
      styles: this.styles,
      pageScript: this.pageScript,
      roles: rolesPlanos
    };
  },


}

module.exports = dashboardUtilities;