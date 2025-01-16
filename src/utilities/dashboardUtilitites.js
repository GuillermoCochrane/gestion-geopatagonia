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
        subSection: "./subSections.ejs",
        title: "Estados",
        dashboardHeader: dashboardHeader,
        estados: estadosPlanos,
        styles: this.styles,
        pageScript: pageScript,
        tabla: "tablaEstados",
        path: "estados",
        formulario: "formEstados"
      };
  
    } catch (error) {
      console.error(error); // Registro del error para depuración
      let data = this.errorHandler(error);
      return data;
    }
  },

  rolesData: async function() {
    try{

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

      // Formateamos la fecha de creación y actualización a cada rol
      rolesPlanos = utilities.multipleDateFormat(rolesPlanos);

      return {
        subSection: "./subSections.ejs",
        title: "Roles",
        dashboardHeader: dashboardHeader,
        roles: rolesPlanos,
        styles: this.styles,
        pageScript: pageScript,
        tabla: "tablaRoles",
        path: "roles",
        formulario: "formRoles"
      };
    } catch (error) {
      console.error(error); // Registro del error para depuración
      let data = this.errorHandler(error);
      return data;
    }
  },
}

module.exports = dashboardUtilities;