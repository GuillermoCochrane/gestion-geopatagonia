const utilities = require("./utilities");

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
      entity: utilities.adjustUnderscores(entidad,true),
    };
  },

  indexData: function(){
    return {
      subSection: "./index.ejs",
      title: "Panel de control",
      styles: this.styles,
      pageScript: this.pageScript
    }
  },


  finalData: function(entidad, coleccion, registros, id = null){
    const config = this.configData(coleccion);
    const headerData = this.headerData(entidad, coleccion);
    let scripts = this.pageScript;
    scripts = [...scripts, "validator.min", "dashboard/validations/validations", `dashboard/validations/${entidad}Validation`];
    !id && scripts.push("dashboard/sectionhandler");
    return {
      ...config,
      dashboardHeader: headerData,
      pageScript: scripts,
      title: id ? `Editando ${headerData.entity} : ${registros[0][entidad]}` : config.mainLabel,
      styles: this.styles,
      subSection: id ? "./edition.ejs" : "./subSections.ejs",
      ...(id ? { id, [entidad]: registros[0] } : { [coleccion]: registros })
    }
  },

  deleteData: async function(Modelo, entidad, coleccion, id){
    try {
      let entity = await Modelo.findByPk(id);
      if(!entity) return this.errorInfo(coleccion);
      return {
        title: `Eliminar ${entidad}: ${entity[entidad]}`,
        path: coleccion,
        id,
        styles: this.styles,
        pageScript: this.pageScript,
        subSection: "./delete.ejs",
      }
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  dataHandler: async function (Modelo, entidad, coleccion, id = null) {
    try {
      // Construir el objeto "where" de manera condicional
      const where = id ? { id } : {};

      // Obtener los registros usando findAll con el "where" opcional
      let registros = await Modelo.findAll({ where });

      // Si no se encuentran registros, devolvemos un mensaje de error
      if (registros.length === 0) {
        return this.errorInfo(coleccion);
      }

      // Convertimos las instancias de Sequelize a objetos planos
      let registrosPlanos = utilities.plainData(registros);
      // Formateamos las fechas en los registros
      registrosPlanos = utilities.multipleDateFormat(registrosPlanos);

      // Retornamos los datos procesados
      return  this.finalData(entidad, coleccion, registrosPlanos, id);
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  userData: async function(ModeloUsuario, ModeloRol) {
    try {
      // Obtebemos el usuario
      const usuarios = await ModeloUsuario.findAll({
        include: [{
          model: ModeloRol,
          attributes: ["rol"],
          as: "rol"
        }]
      });
      // Obtenemos el rol
      let roles = await ModeloRol.findAll();
      (roles.length === 0) 
            ? roles = [{rol: "No hay roles definidos"}] 
            : roles = utilities.plainData(roles);

      // Convertimos las instancias de Sequelize a objetos planos
      let usuariosPlanos = utilities.plainData(usuarios);
      //Damos formato las fechas 
      usuariosPlanos = utilities.multipleDateFormat(usuariosPlanos);
      // Retornamos los datos procesados
      return  {...this.finalData("Usuario", "usuarios", usuariosPlanos), roles};

    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  
  formErrorsHandler: async function(modelo, entidad, coleccion, oldData, errors, id = null) {
    try {
        // Obtiene datos para la vista
        let data = await this.dataHandler(modelo, entidad, coleccion, id); 
        data[entidad] = {};
        // Itera sobre todas las claves de oldData
        for (const fieldName in oldData) {
            // Agrega cada campo ingresado por el usuario al objeto de datos
            data[entidad][fieldName] = oldData[fieldName];
        }
        // Agrega los errores de validación
        data.errors = errors;
        // Devuelve el objeto con los datos necesarios para la vista
        return data; 
        } catch (error) {
          console.error(error);
          return this.errorHandler(error); // Maneja errores internos si ocurre un problema
        }
  },

  userErrorhandler: async function(ModeloUsuario, ModeloRol,  oldData, errors, id = null) {
    try {
        // Obtiene datos para la vista
        let data = await this.userData(ModeloUsuario, ModeloRol); 
        data.usuario = {};
        // Itera sobre todas las claves de oldData
        for (const fieldName in oldData) {
            // Agrega cada campo ingresado por el usuario al objeto de datos
            data.usuario[fieldName] = oldData[fieldName];
        }
        // Agrega los errores de validación
        data.errors = errors;
        // Devuelve el objeto con los datos necesarios para la vista
        return data; 
        } catch (error) {
          console.error(error);
          return this.errorHandler(error); // Maneja errores internos si ocurre un problema
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

  updateEntity: async function (Modelo, data, id) {
    try {
      // Almacenamos en entity los datos recibidos al intentar editar la entrada en la base de datos
      const entity = await Modelo.update(data, {where: { id: id } });
      // si se edita la entrada, devolvemos el objeto creado
      if (entity) return entity;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  deleteEntity: async function (Modelo,  id) {
    try {
      // Elimina la entrada en la base de datos
      const entity = await Modelo.destroy({ where: { id } });
      // si se elimina la entrada, devolvemos el objeto creado
      if (entity) return entity;
    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

}

module.exports = dashboardUtilities;