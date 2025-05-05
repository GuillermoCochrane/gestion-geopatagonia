const { Estado, EnteInspector, Origen, Sector, Rol, Usuario, AdjuntoOriginacion, AdjuntoObservacionPAC, Originacion, ObservacionPAC, Accion } = require("../database/models");
const { Op } = require("sequelize");
const utilities = require("./utilities");

const originacionUtilitites = {
  styles: ["task"],

  pageScript: ["originacion/modalManager", "originacion/selectModalManager"],

  validationScripts: ["validations", "validator.min"],
  
  dashboardHeader: {
    mainLabel: "Originación", 
    newLabel: "Nueva Observación / PAC"
  },
  
  mainSubsection: "./main.ejs",

  confirmPopUp: {
    id: "confirm-pac-delete",
    title: "No hay observaciones o PACs registradas",
    text: "Se eliminará la originación. ¿Estás seguro?",
    buttons: [
      {
        id: "pac-delete",
        text: "Eliminar"       
      },
      {
        id: "pac-cancel",
        text: "Cancelar"
      }
    ]
  },

  successPopUp: {
    id: "pac-delete-success",
    title: "La eliminación se realizó correctamente",
    buttons: [
      {
        id: "pac-delete-close",
        text: "Cerrar"
      }
    ]
  },

  errorPopUp: {
    id: "pac-error",
    title: "Ocurrió un error al eliminar",
    text: "Por favor intente nuevamente",
    buttons: [
      {
        id: "pac-error-close",
        text: "Cerrar"
      }
    ]
  },

  errordata: function(error){
    return {
      styles: this.styles,
      pageScript: ["errorButton"],
      subSection: "../partials/errorManager.ejs",
      title: "Error 500",
      mainTitle: "Error 500",
      secondaryTitle: "Error interno del servidor",
      message: error.message,
      mainError: "mainError",
    };
  },

  headerData: function(title){
    return {
      title: title,
      styles: this.styles,
      pageScript: this.pageScript,
    }
  },

  dataFormatter: function(data=[], fields=[], nestedFields=[]){
    // Si el data no es un array, o esta vacio, devolver vacío
    if (!Array.isArray(data)) return [];
    if (data.length === 0) return [];

    let dataFormatted = utilities.plainData(data);
    dataFormatted = utilities.multipleDateFormat(dataFormatted, fields, nestedFields);
    return dataFormatted;
  },

  originacionFormData: async function(){
    try {
      // Obtiene los datos de las tablas de la base de datos
      let origenData = await Origen.findAll();
      let enteInspectorData = await EnteInspector.findAll();
      let sectorData = await Sector.findAll();
      let estadosData = await Estado.findAll();
      let observadorData = await Usuario.findAll({where: { rol_id: 4}});

      // Devuelve los datos formateados
      return {
        origenes: this.dataFormatter(origenData),
        observadores: this.dataFormatter(observadorData),
        enteInspectores: this.dataFormatter(enteInspectorData),
        sectores: this.dataFormatter(sectorData),
        estados: this.dataFormatter(estadosData),
        originaciones: await this.allOriginacionsData()
      }

    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  originacionData: async function(filter = {}) {
    let data = this.headerData("Originaciones");
    data.pageScript = [...data.pageScript, ...this.validationScripts, "originacion/validations/originacionValidation", "originacion/validations/filterDateValidation"];
    let formData = {};
    let pacTableData = [];
    let originacionData = [];

    try {
      formData = await this.originacionFormData();
      pacTableData = await this.allPACsData(null, filter);
      originacionData = await this.allOriginacionsData();
    } catch (error) {
      console.error(error); // Registro del error para depuración
      throw error;          // Lanzar el error para manejarlo en el controlador
    }

    data.formData = formData;
    data.pacTableData = pacTableData;
    data.subSection = this.mainSubsection;
    data.originacionSelectData = originacionData;
    return data;
  },

  originacionPACData: async function(formData, file, id, nuevaObservacionPAC){
    try {
      // Creación de la originación, si no se pasa el id de una originación existente
      id = id ||await this.createRegistro(formData, file); 

      // Creación de la observación / PAC, si esta indicado en la variable nuevaObservacionPAC
      if (nuevaObservacionPAC) {
        formData.fecha_negociable = utilities.toBoolean(formData.fecha_negociable);
        formData.requiere_analisis = utilities.toBoolean(formData.requiere_analisis);
        await this.createRegistro(formData, file, true);
      }

      const staticData = this.staticData();
      const dynamicData = await this.dynamicData(id);

      return {...staticData, ...dynamicData};
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  staticData: function(){
    // Devuelve los datos que no varian, necesarios el renderizado de la vista
    return {
      ...this.headerData("Originaciones"),
      pageScript: [...this.pageScript, ...this.validationScripts, "sectionhandler", "originacion/validations/obsPACValidation"],
      dashboardHeader: this.dashboardHeader,
      subSection: this.mainSubsection,
      confirmPopUp: this.confirmPopUp,
      successPopUp: this.successPopUp,
      errorPopUp: this.errorPopUp,
    }
  },

  dynamicData: async function(id){
    // Devuelve los datos que varían, para el renderizado dinámico de la vista
    try {
      let tratador = await Usuario.findAll({where: { rol_id: 3}});
      tratador = this.dataFormatter(tratador);
      return {
        oldData: {originacion_id: id},
        tratadorData: tratador, // Datos del tratador para el formulario de PACs
        originacionData: await this.singleOriginacionData(id), // Datos de la originación corrspondientes al id
        observacionesPACs: await this.observacionesPACs(id), // Observaciones / PACs de la originación
        originacionSelectData: await this.allOriginacionsData(),
      }
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  observacionesPACs: async function(id){
    try {
      const data = await ObservacionPAC.findAll({
        where: {originacion_id: id},
        include: [
          { model: Usuario, as: "responsable", attributes: utilities.excludePassword()},
          { model: Estado, as: "estado", attributes: utilities.excludeTimestamps()},
        ]
      });
      return this.dataFormatter(data, ['fecha_requerida']);
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  singleOriginacionData: async function(id){
    try {
      //chequeamos que se ingrese un id válido
      if (!id || typeof id !== 'number') throw new Error("ID inválido o no proporcionado");

      const data = await Originacion.findByPk(id, {
        include: [
          { model: Origen, as: "origen", attributes: utilities.excludeTimestamps() },
          { model: Usuario, as: "observador", attributes: utilities.excludePassword() },
          { model: EnteInspector, as: "ente_inspector", attributes: utilities.excludeTimestamps() },
          { model: Sector, as: "sector", attributes: utilities.excludeTimestamps() },
          { model: AdjuntoOriginacion, as: "adjuntos", attributes: utilities.excludeTimestamps() },
          { model: ObservacionPAC, as: "observaciones_pacs", attributes: ['id', 'inciso', 'descripcion', 'fecha_requerida', 'referencia', 'fecha_negociable', 'requiere_analisis', 'responsable_id', 'originacion_id', 'estado_id'] },
        ]
      });

      //validamos que la consulta tenga información
      if (!data) throw new Error("Originación no encontrada");

      //formateamos la fecha de observación
      let plainData = utilities.plainData(data);
      plainData.fecha_de_observacion = utilities.formatDateDisplay(plainData.fecha_de_observacion);

      return plainData;
    } catch (error) {
      console.error(error); 
      throw error;
    }
  },

  createRegistro: async function (data, file, observacion = false) {
    try {
      // Definimos modelo dependiendo del valor de observacion
      const Modelo = observacion 
        ? ObservacionPAC 
        : Originacion;

      // Crear la entrada
      observacion && (data.estado_id = data.estado_id || 1); // Estado por defecto (1) para observaciones o PACs
      const registro = await Modelo.create(data);

      // Si se subió un archivo, guardarlo en la base de datos
      if (file) {
        await this.createAdjunto(file, registro.id, observacion);
      }

      return registro.id;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  createAdjunto: async function (file, id, observacion = false) {
    try {
      //Definimos archivo, key  y modelo dependiendo del valor de observacion
      const archivo = observacion 
        ? `/documents/observacion_pac/${file.originalname}`  // ← TRUE: Observación/PAC
        : `/documents/originacion/${file.originalname}`;     // ← FALSE: Originación

      const key = observacion 
        ? 'observacion_pac_id' 
        : 'originacion_id';

      const Modelo = observacion 
        ? AdjuntoObservacionPAC 
        : AdjuntoOriginacion;

      // Construir el objeto de datos para el adjunto
      const data = {
        nombre: file.originalname,
        archivo: archivo, 
        descripcion: '-',
        [key]: id, //Asociar el adjunto a la entidad usando el ID proporcionado
      };
      // Crear el adjunto en la base de datos
      const adjunto = await Modelo.create(data);
      return adjunto;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  deleteRegistro: async function (id, observacion = false) {
    try {
      // Definimos modelo dependiendo del valor de observacion
      const Modelo = observacion 
        ? ObservacionPAC 
        : Originacion;
      // Eliminar la entrada del modelo correspondiente
      await Modelo.destroy({
        where: {id: id}
      });
      return true;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  },

  allPACsData: async function(id = null, filtros = {}) {
    //Criterios opcionales de filtrado
    const where = id ? { id } : {};
    const originacionWhere = this.originacionFilter(filtros);
    filtros.estado_id && (where.estado_id = filtros.estado_id);

    //Sub Relaciones a incluir en la consulta
    const originacionIncludes = [
      { model: Origen, as: 'origen', attributes: utilities.excludeTimestamps() },
      { model: Usuario, as: 'observador', attributes: utilities.excludePassword() },
      { model: Sector, as: 'sector', attributes: utilities.excludeTimestamps() },
      { model: EnteInspector, as: 'ente_inspector', attributes: utilities.excludeTimestamps() },
    ];
    const accionIncludes = [
      { model: Usuario, as: 'ejecutor', attributes: utilities.excludePassword() },
    ];

    // Consulta de las observaciones / PACs
    try {
      const resultados = await ObservacionPAC.findAll({
        where,
        include: [
          { 
            model: Originacion, 
            as: 'originacion', 
            include: originacionIncludes, 
            attributes: utilities.excludeTimestamps(), 
            where: originacionWhere 
          },
          { model: Usuario, as: 'responsable', attributes: utilities.excludePassword() },
          { model: Estado, as: 'estado', attributes: utilities.excludeTimestamps() },
          { model: Accion, as: 'acciones', include: accionIncludes, attributes: utilities.excludeTimestamps() },
        ],
        attributes: utilities.excludeTimestamps(),
        order: [['id', 'ASC']],
      });

      // Formateo de las fechas de las observaciones y sus subrelaciones
      return this.dataFormatter(resultados, 
        ['fecha_requerida'], 
        [
          { parentObject: 'originacion', dateField: 'fecha_de_observacion' }, 
          { parentObject: 'acciones', dateField: 'fecha_realizacion' }
        ]
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  allOriginacionsData: async function(){
    const originacionIncludes = [
      { model: Origen, as: 'origen', attributes: utilities.excludeTimestamps() },
      { model: Usuario, as: 'observador', attributes: utilities.excludePassword() },
      { model: Sector, as: 'sector', attributes: utilities.excludeTimestamps() },
      { model: EnteInspector, as: 'ente_inspector', attributes: utilities.excludeTimestamps() },
    ];
    try {
      const originaciones = await Originacion.findAll({
        include: originacionIncludes,
        attributes: utilities.excludeTimestamps(),
        order: [['id', 'ASC']],
      });

      return this.dataFormatter(originaciones, ['fecha_de_observacion']);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  pacData: async function(id, action){
    try{
      const allPACDatadata = await this.allPACsData(id);
      const title = allPACDatadata[0].requiere_analisis ? "PAC" : "Observación";
      let data = this.headerData(title);
      data.pageScript = [ ...this.validationScripts, "originacion/sidebarManager", "originacion/actionsModalManager", "originacion/validations/modifyResponsableValidation", "originacion/validations/addActionValidation", "originacion/exportManager"  ];
      data.subSection  = "./actions.ejs";
      data.subSectionStyles = "pac-actions";
      data.action = action;
      data.responsables = await Usuario.findAll({where: { rol_id: 3}});
      data.ejecutores = await Usuario.findAll({where: { rol_id: 1}}); 
      data.pacData = allPACDatadata[0];
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  modifyPACResponsable: async function(id, data){
    try{
      const modifiedData = await ObservacionPAC.update(data, {
        where: {id: id},
      });
      return modifiedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createAccion: async function(id, data){
    data.observacion_pac_id = id;
    try{
      const newAccion = await Accion.create(data);
      return newAccion;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  exportPDF: async function(id, host, protocol){
    try{
      if (!id ||!host || !protocol) throw new Error("Datos insuficientes para generar el PDF");
      const baseUrl = `${protocol}://${host}`;
      const pdf = await utilities.generateURLPDF(`${baseUrl}/originacion/observacionPAC/pdf/${id}`);
      return pdf;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
  originacionFilter: function(filtros) {
    const where = {};
  
    if (filtros.inicio_carga && filtros.fin_carga) {
      where.created_at = { [Op.between]: [filtros.inicio_carga, filtros.fin_carga] };
    } else if (filtros.inicio_carga) {
      where.created_at = { [Op.gte]: filtros.inicio_carga };
    } else if (filtros.fin_carga) {
      where.created_at = { [Op.lte]: filtros.fin_carga };
    }
  
    filtros.id && (where.id = filtros.id);
    filtros.origen_id && (where.origen_id = filtros.origen_id);
    filtros.sector_id && (where.sector_id = filtros.sector_id);
    filtros.ente_inspector_id && (where.ente_inspector_id = filtros.ente_inspector_id);
  
    return where;
  },
  
}

module.exports = originacionUtilitites;