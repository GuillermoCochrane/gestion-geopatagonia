const db = require("../database/models");
const utilities = require("./utilities");
const { Estado, EnteInspector, Origen, Sector, Rol, Usuario } = db;

const dashboardUtilities = {

  styles: ["dashboard"],

  pageScript: ["dashboard/dashboard"],

  errorInfo: function(){
    return {
      subSection: "./error.ejs",
      title: "Error",
      styles: this.styles,
      pageScript: this.pageScript,
      error: true,
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
    try {

      let estados = await Estado.findAll();

      // Si no se encuentran estados, devolvemos un mensaje de error
      if (estados.length === 0) {
        let data = this.errorInfo();
        data.message = "No hay estados registrados.";
        data.errorData = null;
        return data;
      }

      // Convertimos las instancias de Sequelize a objetos planos
      const estadosPlanos = estados.map(estado => estado.get({ plain: true }));
      const dashboardHeader = {
        mainLabel: "Estados",
        newLabel: "Nuevo estado"
      };

      let pageScript = this.pageScript;
      pageScript.push("dashboard/sectionhandler");
      
      // recorremos cada estado y le formateamos la fecha de creación y actualización
      for (const estado of estadosPlanos) {
        estado.created_at = utilities.formatDateDisplay(estado.created_at);
        estado.updated_at = utilities.formatDateDisplay(estado.updated_at);
      }

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

}

module.exports = dashboardUtilities;