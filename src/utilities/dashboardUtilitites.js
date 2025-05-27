const utilities = require("./utilities");

const dashboardUtilities = {

  styles: ["dashboard"],

  pageScript: ["dashboard/dashboard"],


  errorPageScript: function(){
    return [...this.pageScript, "errorButton"];
  },

  errorInfo: function(errormsg){
    return {
      subSection: "../partials/errorManager.ejs",
      title: "Error",
      styles: this.styles,
      pageScript: this.errorPageScript(),
      error: true,
      mainTitle: "Error 404",
      secondaryTitle: "Recurso no encontrado",
      message: `No hay ${errormsg} disponibles en la base de datos.`,
      errorData: null,
    }
  },

  errorHandler: function(error){
    let errorData = this.errorInfo();
    errorData.mainTitle = "Error 500";
    errorData.secondaryTitle = "Se ha producido el siguiente error:";
    errorData.message = "Error interno del servidor. Por favor, inténtalo más tarde.";
    errorData.errorData = error.message || error;
    return errorData;
  },

  configData: function(coleccion){
    const newName = utilities.adjustUnderscores(coleccion,false) //coleccion.charAt(0).toUpperCase() + coleccion.slice(1);
    return {
      tabla: `tabla${newName}`,
      path: coleccion,
      componenteFormulario: `form${newName}`,
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

  finalData: function(entidad, coleccion, registros, id = null, nombre = null){
    const config = this.configData(coleccion);
    const headerData = this.headerData(entidad, coleccion);
    let scripts = this.pageScript;
    scripts = [...scripts, "validator.min", "validations", `dashboard/validations/${entidad}Validation`];
    !id && scripts.push("sectionhandler");
    const entity = (entidad === "formulario") ? "codigo" : entidad;
    let name = null;
    if (registros.length > 0) name = nombre ? nombre : registros[0][entity];
    const singleTitle = id ?`Editando ${headerData.entity} : ${name}`: headerData.mainLabel;
    return {
      ...config,
      dashboardHeader: headerData,
      pageScript: scripts,
      title: singleTitle,
      styles: this.styles,
      subSection: id ? "./edition.ejs" : "./subSections.ejs",
      ...(id ? { id, [entidad]: registros[0] } : { [coleccion]: registros })
    }
  },

  deleteData: async function(Modelo, entidad, coleccion, id, exception = false){
    try {
      let entity = await Modelo.findByPk(id);
      if(!entity) return this.errorInfo(coleccion);
      //Muestra diferentes títulos si se especifica si es un excepción o no
      let title = exception ? `Eliminar ${entidad}: ${(entity.nombre || entity.codigo || entity.inciso)}` : `Eliminar ${entidad}: ${entity[entidad]}`;
      return {
        title,
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

  userData: async function(ModeloUsuario, ModeloRol, id = null) {
    try {
      // Construir el objeto "where" de manera condicional
      const where = id ? { id } : {};

      // Obtebemos usuario / usuarios 
      const usuarios = await ModeloUsuario.findAll({
        include: [{
          model: ModeloRol,
          attributes: ["rol"],
          as: "rol"
        }],
        where
      });

      // Obtenemos los roles
      let roles = await ModeloRol.findAll();
      (roles.length === 0) 
            ? roles = [{rol: "No hay roles definidos"}] 
            : roles = utilities.plainData(roles);

      // Convertimos las instancias de Sequelize a objetos planos
      let usuariosPlanos = utilities.plainData(usuarios);
      //Damos formato las fechas 
      usuariosPlanos = utilities.multipleDateFormat(usuariosPlanos);

      // Obtenemos el nombre del usuario si es necesario
      let nombre = null;
      if (id) { 
        nombre = usuariosPlanos[0].nombre;
      }

      // Procesamos los datos
      let finalData = { ...this.finalData("usuario", "usuarios", usuariosPlanos, id, nombre), roles };
      id && delete finalData.usuario.password

      return  finalData;

    } catch (error) {
      console.error(error); // Registro del error para depuración
      return this.errorHandler(error);
    }
  },

  // Formulario de creacion de incisos
  itemData: async function(ModeloInciso, ModeloFormulario, id = null) {
    // Construir el objeto "where" de manera condicional
    const where = id ? { id } : {};

    // Obtenemos inciso / incisos
    const incisos = await ModeloInciso.findAll({
      include: [{
        model: ModeloFormulario,
        attributes: ["codigo"],
        as: "formulario"
      }],
      where
    });

    // Obtenemos los formularios
    let formularios = await ModeloFormulario.findAll();
    (formularios.length === 0) 
          ? formularios = [{codigo: "No hay formularios definidos"}] 
          : formularios = utilities.plainData(formularios);
    
          // Convertimos las instancias de Sequelize a objetos planos
    let incisosPlanos = utilities.plainData(incisos);
    //Damos formato las fechas 
    incisosPlanos = utilities.multipleDateFormat(incisosPlanos);

    // Obtenemos el nombre del inciso si es necesario
    let nombre = null;
    if (id) { 
      nombre = incisosPlanos[0].inciso;
    }

    // Procesamos los datos
    let finalData = { ...this.finalData("inciso", "incisos", incisosPlanos, id, nombre ), formularios };
    return  finalData;
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
        let data = await this.userData(ModeloUsuario, ModeloRol, id);
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

  itemErrorHandler: async function(ModeloInciso, ModeloFormulario, oldData, errors, id = null) {
    try {
        // Obtiene datos para la vista
        let data = await this.itemData(ModeloInciso, ModeloFormulario, id); 
        data.inciso = {};
        // Itera sobre todas las claves de oldData
        for (const fieldName in oldData) {
            // Agrega cada campo ingresado por el usuario al objeto de datos
            data.inciso[fieldName] = oldData[fieldName];
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

  createEntity: async function (Modelo, data, isUser = false) {
    try {
      // Si es un usuario, encriptamos la contraseña
      isUser && (data.password = utilities.hashPassword(data.password));
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